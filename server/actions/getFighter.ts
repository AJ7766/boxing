import fs from 'fs';
import path from 'path';

export const getFighter = async (name: string) => {
    const cacheFilePath = path.resolve('./cache', 'fighters.json'); // Path to the JSON file where you store the fighters data

    try {
        // Check if the cache file exists
        if (fs.existsSync(cacheFilePath)) {
            const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
            const fighters = JSON.parse(cachedData); // Parse the cached data

            // Query the fighters based on the name
            const fighterName = name.toLowerCase();
            let fighter = null;

            for (let i = 0; i < fighters.length; i++) {
                if (fighters[i].name.toLowerCase() === fighterName) {
                    fighter = fighters[i];
                    break; // Exit the loop once the match is found
                }
            }

            if (!fighter) {
                console.log('fighter not found');
                return null;
            }
            return fighter; // Return the found fighter
            
        } else {
            console.log('Cache file not found');
            return null;
        }
    } catch (error) {
        console.error('Error reading the cache file:', error);
        return null;
    }
}
