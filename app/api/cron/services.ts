import { RankingsProps } from "@/types/rankingsTypes";
import puppeteer from "puppeteer";

export const getRankings = async () => {
    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Navigate to the Wikipedia page
    await page.goto(process.env.SCRAPE_RANKING_URL as string);

    // Wait for the tables to load
    await page.waitForSelector('table');

    // Extract data for men's and women's rankings
    const rankings = await page.evaluate(() => {
        const mensRows = Array.from(document.querySelectorAll('table:nth-of-type(1) tr'));
        const womensRows = Array.from(document.querySelectorAll('table:nth-of-type(2) tr'));

        // Filter out rows that don't contain <td> elements (headers or empty rows)
        const mensDataRows = mensRows.filter(row => row.querySelectorAll('td').length > 0);
        const womensDataRows = womensRows.filter(row => row.querySelectorAll('td').length > 0);

        // Find the index where the unwanted section starts (men's rankings section)
        const stopMensIndex = mensDataRows.findIndex(row =>
            row.textContent?.trim().toLowerCase().includes("current world champions")
        );

        const stopWomensIndex = womensDataRows.findIndex(row =>
            row.textContent?.trim().toLowerCase().includes("current world champions")
        );

        // Get the valid rows for men's and women's rankings
        const validMensRows = stopMensIndex !== -1 ? mensDataRows.slice(0, stopMensIndex) : mensDataRows;
        const validWomensRows = stopWomensIndex !== -1 ? womensDataRows.slice(0, stopWomensIndex) : womensDataRows;

        // Map the men’s and women’s data separately
        const mensRankings: RankingsProps[] = validMensRows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            return {
                'id': cells[0]?.textContent?.trim() || '',
                'boxer': cells[0]?.textContent?.trim() || null,
                'record': cells[1]?.textContent?.trim() || null,
                'weightClass': cells[2]?.textContent?.trim() || null,
                'currentWorldTitles': cells[3]?.textContent?.trim() || null,
                'theRing': cells[4]?.textContent?.trim() || null,
                'bwaa': cells[5]?.textContent?.trim() || null,
                'tbrb': cells[6]?.textContent?.trim() || null,
                'espn': cells[7]?.textContent?.trim() || null,
                'boxRec': cells[8]?.textContent?.trim() || null,
            };
        });

        const womensRankings: RankingsProps[] = validWomensRows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            return {
                'id': cells[0]?.textContent?.trim() || '',
                'boxer': cells[0]?.textContent?.trim() || null,
                'record': cells[1]?.textContent?.trim() || null,
                'weightClass': cells[2]?.textContent?.trim() || null,
                'currentWorldTitles': cells[3]?.textContent?.trim() || null,
                'theRing': cells[4]?.textContent?.trim() || null,
                'espn': cells[5]?.textContent?.trim() || null,
                'boxRec': cells[6]?.textContent?.trim() || null,
            };
        });

        // Function to sort the rankings before passing them
        const sortRankings = (rankings: RankingsProps[], key: keyof RankingsProps) => {
            return [...rankings].sort((a, b) => {
                const aValue = Number(a[key]?.match(/(\d+)/)?.[0]) || Infinity;
                const bValue = Number(b[key]?.match(/(\d+)/)?.[0]) || Infinity;

                return aValue - bValue;
            });
        };

        return {
            mensScrapedRankings: sortRankings(mensRankings, 'theRing'),
            womensCrapedRankings: sortRankings(womensRankings, 'theRing')
        };
    });
    // Close the browser
    await browser.close();

    return rankings;
}
