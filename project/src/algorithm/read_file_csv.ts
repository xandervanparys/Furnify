import Papa from 'papaparse';

// Function to parse CSV data
export async function parseCsvData(): Promise<any[]> {

    const response = await fetch('/meubels.csv');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
        }

        // Read response body as text
        const csvData = await response.text();
    
    const parsedData = Papa.parse(csvData,{
        delimiter: ";",
        header: true
    })
    if (parsedData.errors.length > 0) {
        console.error('Error parsing CSV:', parsedData.errors);
    }

    return parsedData.data;
}