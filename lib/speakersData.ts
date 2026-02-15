// Speakers data - Fetched from Google Sheets
export interface Speaker {
  name: string;
  title: string;
  company: string;
  image: string;
  linkedin?: string;
}

// Google Sheets configuration
const SHEET_ID = process.env.NEXT_PUBLIC_SPEAKERS_SHEET_ID || '1mcGxjKkEy60HuRFOax-jN6wki0cHolxKZ8VRnpPVzVE';
const SHEET_GID = process.env.NEXT_PUBLIC_SPEAKERS_GID || '1';

// CSV export endpoint - Speakers tab
const SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
const SHEETS_CSV_URL_FALLBACK = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

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

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEY = 'hr_evolve_speakers_cache';

interface CachedSpeakerData {
  data: Speaker[];
  timestamp: number;
}

// Check if cached data is still valid
function getCachedData(): Speaker[] | null {
  if (typeof window === 'undefined') return null; // SSR check
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedSpeakerData = JSON.parse(cached);
    const now = Date.now();
    
    if (now - parsedCache.timestamp < CACHE_DURATION) {
      return parsedCache.data;
    } else {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  } catch (error) {
    console.error('Error reading speaker cache:', error);
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (e) {
      // Ignore localStorage errors in case it's not available
    }
    return null;
  }
}

// Save data to cache
function setCachedData(data: Speaker[]): void {
  if (typeof window === 'undefined') return; // SSR check
  
  try {
    const cacheData: CachedSpeakerData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching speaker data:', error);
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
export function getSpeakerImageUrls(url: string): string[] {
  if (!url) return [getFallbackSpeakerImage()];

  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/[-\w]{25,}/);
    const fileId = fileIdMatch?.[0];

    if (!fileId) return [getFallbackSpeakerImage()];

    return [
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
    ];
  }

  return [url];
}

// Helper function to get a fallback speaker image
export function getFallbackSpeakerImage(): string {
  return 'https://via.placeholder.com/400x400/1f2937/ffffff?text=SPEAKER';
}

// Get cache timestamp for display
export function getSpeakerCacheTimestamp(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const parsedCache: CachedSpeakerData = JSON.parse(cached);
    return new Date(parsedCache.timestamp).toLocaleTimeString();
  } catch (error) {
    return null;
  }
}

// Function to fetch speakers from Google Sheets with robust error handling
export async function fetchSpeakersFromGoogleSheets(forceRefresh = false): Promise<Speaker[]> {
  // Fallback data with default speakers
  const fallbackSpeakers: Speaker[] = [
    {
      name: 'Seeram Sambasiva Rao IAS',
      title: 'Special Secretary (E & ITD) / Chairman,',
      company: 'Kerala State IT Mission',
      image: '/speakers/speaker_1.jpg',
    },
    {
      name: 'Dr.Jayasankar Prasad C',
      title: 'Director,',
      company: 'CMD',
      image: '/speakers/speaker_15.jpg',
      linkedin: 'https://www.linkedin.com/in/jayasankar-prasad-c-b5459bb',
    },
    {
      name: 'Anoop Ambika',
      title: 'CEO,',
      company: 'Kerala Start-up Mission',
      image: '/speakers/speaker_2.jpg',
      linkedin: 'https://www.linkedin.com/in/anoopambika',
    },
    {
      name: 'Sreekumar V',
      title: 'Secretary, GTech & Centre Head,',
      company: 'Tata Elxsi',
      image: '/speakers/speaker_3.jpg',
      linkedin: 'https://www.linkedin.com/in/sreekumarv',
    },
    {
      name: 'Col. Sanjeev Nair (Retd.)',
      title: 'CEO,',
      company: 'Technopark',
      image: '/speakers/speaker_4.jpg',
      linkedin: 'https://www.linkedin.com/in/sanjeevnair13',
    },
    {
      name: 'Deepu S Nath',
      title: 'Managing Director,',
      company: 'Faya',
      image: '/speakers/speaker_5.jpg',
      linkedin: 'https://www.linkedin.com/in/deepusnath',
    },
    {
      name: 'Raj Gopal R',
      title: 'Deputy Vice President & Regional Head,',
      company: 'Federal Bank',
      image: '/speakers/speaker_16.jpg',
    },
    {
      name: 'Nisha Gopinath',
      title: 'Vice President and Head of HR,',
      company: 'IBM India and South Asia',
      image: '/speakers/speaker_6.jpg',
      linkedin: 'https://www.linkedin.com/in/nisha-gopinath-4087651',
    },
    {
      name: 'Charles Godwin',
      title: 'HR Leader,',
      company: 'Zoho Corporation',
      image: '/speakers/speaker_7.jpg',
      linkedin: 'https://www.linkedin.com/in/charlesgodwin',
    },
    {
      name: 'Magical Rafi',
      title: 'Founder & Chief Mentor,',
      company: 'Magic of Change',
      image: '/speakers/speaker_8.jpg',
      linkedin: 'https://www.linkedin.com/in/mohammedrafinlptrainer',
    },
    {
      name: 'Saurabh Singh',
      title: 'Consulting and Capability,',
      company: 'SHRM India',
      image: '/speakers/speaker_9.jpg',
      linkedin: 'https://www.linkedin.com/in/learnsingh',
    },
    {
      name: 'Karthika Nair S',
      title: 'Associate Director',
      company: '',
      image: '/speakers/speaker_13.jpg',
    },
    {
      name: 'Jayan Nair',
      title: 'Chief People Officer,',
      company: 'IBS Software',
      image: '/speakers/speaker_10.jpg',
      linkedin: 'https://www.linkedin.com/in/jayan-nair-0b11874',
    },
    {
      name: 'Manoj Elanjickal',
      title: 'Director - People & Culture,',
      company: 'H&R Block India',
      image: '/speakers/speaker_11.jpg',
      linkedin: 'https://www.linkedin.com/in/manojelanjickal',
    },
    {
      name: 'Varun Palat',
      title: 'Deputy Vice President - HR,',
      company: 'Federal Bank',
      image: '/speakers/speaker_12.jpg',
      linkedin: 'https://www.linkedin.com/in/varun-palat-18312912b',
    },
    {
      name: 'Aditi Radhakrishnan',
      title: 'Consultant & Coach,',
      company: 'Mitara Consulting Services',
      image: '/speakers/speaker_14.jpg',
      linkedin: 'https://www.linkedin.com/in/aditiradhakrishnan',
    },
    {
      name: 'Dr. Thomas George K ',
      title: 'Director,',
      company: 'LEAD College (Autonomous)',
      image: '/speakers/speaker_17.jpg',
      linkedin: 'https://www.linkedin.com/in/thomasgeorgek',
    },
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
    // Add timeout to prevent hanging requests
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
      console.warn('No data found in the speaker sheet');
      return fallbackSpeakers;
    }

    // Parse CSV data using enhanced parser
    const parsedRows = parseCSVData(csvText);
    
    if (parsedRows.length <= 1) {
      console.warn('Only header row found or no speaker data');
      return fallbackSpeakers;
    }

    // Skip header row and parse data
    // Expected columns: name, title, company, image, linkedin
    const speakers: Speaker[] = parsedRows.slice(1).map((row, index) => {
      try {
        // Validate that we have enough columns
        if (row.length < 4) {
          console.warn(`Speaker row ${index + 2} has insufficient columns (${row.length}):`, row);
          return null;
        }
        
        // Pad with empty strings if needed
        while (row.length < 5) {
          row.push('');
        }
        
        const name = row[0]?.trim();
        const title = row[1]?.trim();
        const company = row[2]?.trim();
        const image = row[3]?.trim();
        const linkedin = row[4]?.trim();
        
        // Validate required fields
        if (!name || !title || !image) {
          console.warn(`Speaker row ${index + 2} missing required fields:`, { name, title, image });
          return null;
        }
        
        const speakerData: Speaker = {
          name,
          title,
          company: company || '',
          image: image.includes('drive.google.com') ? convertGoogleDriveUrl(image) : image,
          linkedin: linkedin || undefined
        };
        
        return speakerData;
      } catch (error) {
        console.error(`Error parsing speaker row ${index + 2}:`, error);
        console.error('Problematic row data:', row);
        return null;
      }
    }).filter(Boolean) as Speaker[]; // Filter out null values

    if (speakers.length === 0) {
      return fallbackSpeakers;
    }

    // Cache the successful result
    setCachedData(speakers);
    
    return speakers;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Speaker request timed out - taking too long to fetch data');
    } else {
      console.error('Error fetching speakers from Google Sheets:', error);
    }
    
    // Try to return cached data even if expired, as fallback
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsedCache: CachedSpeakerData = JSON.parse(cached);
        return parsedCache.data;
      }
    } catch (e) {
      console.error('Could not access expired cache:', e);
    }
    
    return fallbackSpeakers;
  }
}
