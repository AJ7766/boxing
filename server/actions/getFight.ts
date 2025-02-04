"use server"
import fs from 'fs';
import path from 'path';

export const getFight = async (id: string) => {
    const cacheFilePath = path.resolve('./cache', 'fights.json'); // Path to the JSON file where you store the fighters data

    try {
        // Check if the cache file exists
        if (fs.existsSync(cacheFilePath)) {
            const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
            const fights = JSON.parse(cachedData); // Parse the cached data

            // Query the fights based on the id
            let fight = null;

            for (let i = 0; i < fights.length; i++) {
                if (fights[i].id === id) {
                    fight = fights[i];
                    break; // Exit the loop once the match is found
                }
            }
            if (!fight) {
                console.log('fight not found');
                return null;
            }
            return fight; // Return the found fight
            
        } else {
            console.log('Cache file not found');
            return null;
        }
    } catch (error) {
        console.error('Error reading the cache file:', error);
        return null;
    }
}
