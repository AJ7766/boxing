import fs from 'fs';
import path from 'path';

export const getFights = async () => {
    const cacheFilePath = path.resolve('./cache', 'fights.json');
    const url = 'https://boxing-data-api.p.rapidapi.com/v1/fights/?page_num=1&page_size=5000';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6910437ca8mshc8ebc615f9d6290p1e1fbfjsn6f6e59ef8b51',
            'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com'
        }
    };

    try {
        // Check if the cache file already exists
        if (fs.existsSync(cacheFilePath)) {
            console.log('Using cached data');
            const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
            return JSON.parse(cachedData); // Parse the cached data and return it
        }

        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON

        // Write the response data to the cache file
        fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true }); // Create the cache folder if it doesn't exist
        fs.writeFileSync(cacheFilePath, JSON.stringify(result)); // Save the data to a file

        console.log('Data fetched and cached');
        return result;
    } catch (error) {
        console.error(error);
    }
}
