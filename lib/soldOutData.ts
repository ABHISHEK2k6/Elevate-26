// Sold Out status - Fetched from Google Sheets
export interface SoldOutStatus {
  isSoldOut: boolean;
}

// Google Sheets configuration
const SHEET_ID = process.env.NEXT_PUBLIC_SPEAKERS_SHEET_ID || '1mcGxjKkEy60HuRFOax-jN6wki0cHolxKZ8VRnpPVzVE';
const SHEET_GID = process.env.NEXT_PUBLIC_SOLD_OUT_GID || '2059209065';

// CSV export endpoint - Sold Out tab
const SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

// Function to parse CSV data
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i += 2;
        continue;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else if (char === '\r' && !inQuotes) {
      // Skip carriage returns
    } else if (char === '\n' && !inQuotes) {
      break;
    } else {
      current += char;
    }
    i++;
  }
  
  if (current) {
    result.push(current.trim());
  }
  
  return result;
}

// Fetch sold out status from Google Sheets
export async function fetchSoldOutStatus(): Promise<SoldOutStatus> {
  try {
    const response = await fetch(SHEETS_CSV_URL, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error('Failed to fetch sold out status from Google Sheets');
      return { isSoldOut: false }; // Default to not sold out on error
    }

    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      console.error('CSV file is empty or invalid');
      return { isSoldOut: false };
    }

    // Parse header row to find "Sold Out" column
    const headers = parseCSVLine(lines[0]);
    const soldOutColumnIndex = headers.findIndex(
      header => header.toLowerCase().trim() === 'sold out'
    );

    if (soldOutColumnIndex === -1) {
      console.error('Could not find "Sold Out" column in CSV');
      return { isSoldOut: false };
    }

    // Parse first data row
    const dataRow = parseCSVLine(lines[1]);
    const soldOutValue = dataRow[soldOutColumnIndex]?.trim().toUpperCase();
    
    // Convert TRUE/FALSE string to boolean
    const isSoldOut = soldOutValue === 'TRUE';

    console.log('Sold Out Status:', isSoldOut);
    
    return { isSoldOut };
  } catch (error) {
    console.error('Error fetching sold out status:', error);
    return { isSoldOut: false }; // Default to not sold out on error
  }
}

// Static fallback data
export const fallbackSoldOutStatus: SoldOutStatus = {
  isSoldOut: false
};
