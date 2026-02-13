// Partners data - Fetched from Google Sheets using the same robust system as events
export interface Partner {
  name: string;
  logo: string;
  website?: string;
}

// Google Sheets configuration
const SHEET_ID = process.env.NEXT_PUBLIC_PARTNERS_SHEET_ID || '1mcGxjKkEy60HuRFOax-jN6wki0cHolxKZ8VRnpPVzVE';

// CSV export endpoint - working format confirmed by testing
const SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const SHEETS_CSV_URL_FALLBACK = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Enhanced CSV parser function to handle complex data including multiline fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        // Handle escaped quotes ("")
        current += '"';
        i += 2;
        continue;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else if (char === '\r' && !inQuotes) {
      // Skip carriage returns outside quotes
    } else if (char === '\n' && !inQuotes) {
      // Skip newlines outside quotes (end of record)
      break;
    } else {
      // Add character (including newlines within quotes)
      current += char;
    }
    i++;
  }
  
  // Add the last field
  result.push(current.trim());
  
  // Clean up the fields by removing outer quotes and normalizing whitespace
  return result.map(field => {
    field = field.trim();
    if (field.startsWith('"') && field.endsWith('"')) {
      field = field.slice(1, -1);
      // Handle escaped quotes within the field
      field = field.replace(/""/g, '"');
    }
    // Normalize whitespace and remove extra line breaks
    field = field.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n+/g, ' ').trim();
    return field;
  });
}

// Enhanced function to parse CSV data that might have multiline records
function parseCSVData(csvText: string): string[][] {
  const lines: string[] = [];
  const rawLines = csvText.split('\n');
  let currentLine = '';
  
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    currentLine += (currentLine ? '\n' : '') + line;
    
    // Count quotes to determine if we're inside a quoted field
    let quoteCount = 0;
    for (let char of currentLine) {
      if (char === '"') quoteCount++;
    }
    
    // If quote count is even, we're not inside quotes
    if (quoteCount % 2 === 0) {
      lines.push(currentLine);
      currentLine = '';
    }
  }
  
  // Add any remaining line
  if (currentLine.trim()) {
    lines.push(currentLine);
  }
  
  return lines.map(line => parseCSVLine(line));
}

// Cache duration in milliseconds (5 minutes for partners data)
const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEY = 'hr_evolve_partners_cache';

interface CachedPartnerData {
  data: Partner[];
  timestamp: number;
}

// Check if cached data is still valid
function getCachedData(): Partner[] | null {
  if (typeof window === 'undefined') return null; // SSR check
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedPartnerData = JSON.parse(cached);
    const now = Date.now();
    
    if (now - parsedCache.timestamp < CACHE_DURATION) {
      return parsedCache.data;
    } else {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  } catch (error) {
    console.error('Error reading partner cache:', error);
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (e) {
      // Ignore localStorage errors in case it's not available
    }
    return null;
  }
}

// Save data to cache
function setCachedData(data: Partner[]): void {
  if (typeof window === 'undefined') return; // SSR check
  
  try {
    const cacheData: CachedPartnerData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching partner data:', error);
  }
}

// Helper function to convert Google Drive URLs to direct image URLs
export function convertGoogleDriveUrl(url: string, format: 'uc' | 'thumbnail' | 'proxy' = 'uc'): string {
  if (!url || !url.includes('drive.google.com')) {
    return url; // Return as-is if not a Google Drive URL
  }

  // Extract file ID from Google Drive URL
  let fileId = '';
  
  // Pattern 1: /file/d/FILE_ID/view
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    fileId = fileIdMatch[1];
  }
  
  // Pattern 2: id=FILE_ID
  if (!fileId) {
    const alternativeMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (alternativeMatch && alternativeMatch[1]) {
      fileId = alternativeMatch[1];
    }
  }
  
  // Pattern 3: /open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openMatch && openMatch[1]) {
      fileId = openMatch[1];
    }
  }

  if (!fileId) {
    console.warn('Could not extract file ID from Google Drive URL:', url);
    return url; // Return original URL if no file ID found
  }

  // Convert based on format preference
  switch (format) {
    case 'uc':
      // Standard direct view URL (best for images)
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    
    case 'thumbnail':
      // Thumbnail URL (good for smaller images, faster loading)
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    
    case 'proxy':
      // Alternative proxy method (sometimes more reliable)
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    
    default:
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
}

// Helper function to get multiple Google Drive URL formats for fallback
export function getPartnerImageUrls(url: string): string[] {
  if (!url) {
    return [getFallbackPartnerImage()];
  }

  if (url.includes('drive.google.com')) {
    return [
      convertGoogleDriveUrl(url, 'uc'),        // Primary: Direct view
      convertGoogleDriveUrl(url, 'thumbnail'), // Secondary: Thumbnail
      convertGoogleDriveUrl(url, 'proxy'),     // Tertiary: Proxy
    ].filter(Boolean);
  }
  
  // If it's already a direct image URL, return as is
  return [url];
}

// Helper function to get a fallback partner image
export function getFallbackPartnerImage(): string {
  return 'https://via.placeholder.com/300x200/1f2937/ffffff?text=PARTNER+LOGO';
}

// Get cache timestamp for display
export function getPartnerCacheTimestamp(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedPartnerData = JSON.parse(cached);
    return new Date(parsedCache.timestamp).toLocaleTimeString();
  } catch (error) {
    return null;
  }
}

// Function to fetch partners from Google Sheets with robust error handling (same as events)
export async function fetchPartnersFromGoogleSheets(forceRefresh = false): Promise<Partner[]> {
  // Enhanced fallback data with guaranteed working image URLs (like your events)
  const fallbackPartners = [
    {
      name: "Premium Partner",
      logo: "https://via.placeholder.com/140x70/1f2937/ffffff?text=PREMIUM",
      website: "#"
    },
    {
      name: "Gold Sponsor", 
      logo: "https://via.placeholder.com/140x70/f59e0b/ffffff?text=GOLD",
      website: "#"
    },
    {
      name: "Silver Sponsor",
      logo: "https://via.placeholder.com/140x70/6b7280/ffffff?text=SILVER", 
      website: "#"
    },
    {
      name: "Technology Partner",
      logo: "https://via.placeholder.com/140x70/3b82f6/ffffff?text=TECH", 
      website: "#"
    },
    {
      name: "Innovation Partner",
      logo: "https://via.placeholder.com/140x70/10b981/ffffff?text=INNOVATION", 
      website: "#"
    },
    {
      name: "Strategic Partner",
      logo: "https://via.placeholder.com/140x70/8b5cf6/ffffff?text=STRATEGIC", 
      website: "#"
    }
  ];

  // Check cache first (unless force refresh is requested)
  if (!forceRefresh) {
    const cachedData = getCachedData();
    if (cachedData) {
      return cachedData;
    }
  } else {
    // Clear cache when force refreshing
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }

  try {
    // Add timeout to prevent hanging requests (same as events)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response = await fetch(SHEETS_CSV_URL, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    // If primary URL fails, try fallback URL
    if (!response.ok) {
      response = await fetch(SHEETS_CSV_URL_FALLBACK, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
    }
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('Fetch failed. Response details:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    if (!csvText.trim()) {
      console.warn('No data found in the partner sheet');
      return fallbackPartners;
    }

    // Parse CSV data using enhanced parser (same as events)
    const parsedRows = parseCSVData(csvText);
    
    if (parsedRows.length <= 1) {
      console.warn('Only header row found or no partner data');
      return fallbackPartners;
    }

    // Skip header row and parse data (same logic as events)
    const partners: Partner[] = parsedRows.slice(1).map((row, index) => {
      try {
        // Validate that we have enough columns
        if (row.length < 1) {
          console.warn(`Partner row ${index + 2} has insufficient columns (${row.length}):`, row);
          return null;
        }
        
        // Pad with empty strings if needed (same as events)
        while (row.length < 3) {
          row.push('');
        }
        
        // Handle different formats - prioritize the logo URL column
        let partnerData: Partner;
        
        if (row.length >= 2 && row[0] && row[1]) {
          // Format: Name, Logo URL, Website URL (preferred)
          partnerData = {
            name: row[0].trim(),
            logo: convertGoogleDriveUrl(row[1].trim()),
            website: row[2]?.trim() || '#'
          };
        } else if (row.length >= 1 && row[0]) {
          // Format: Just Logo URL (fallback to your current format)
          const logoUrl = row[0].trim();
          if (logoUrl.startsWith('http')) {
            const partnerNames = [
              'Premium Partner',
              'Gold Sponsor', 
              'Silver Sponsor',
              'Technology Partner',
              'Innovation Partner',
              'Strategic Partner'
            ];
            
            partnerData = {
              name: partnerNames[index % partnerNames.length] || `Partner ${index + 1}`,
              logo: convertGoogleDriveUrl(logoUrl),
              website: '#'
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
        
        return partnerData;
      } catch (error) {
        console.error(`Error parsing partner row ${index + 2}:`, error);
        console.error('Problematic row data:', row);
        return null;
      }
    }).filter(Boolean) as Partner[]; // Filter out null values

    if (partners.length === 0) {
      return fallbackPartners;
    }

    // Cache the successful result
    setCachedData(partners);
    
    return partners;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Partner request timed out - taking too long to fetch data');
    } else {
      console.error('Error fetching partners from Google Sheets:', error);
    }
    
    // Try to return cached data even if expired, as fallback (same as events)
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsedCache: CachedPartnerData = JSON.parse(cached);
        return parsedCache.data;
      }
    } catch (e) {
      console.error('Could not access expired cache:', e);
    }
    
    return fallbackPartners;
  }
}

