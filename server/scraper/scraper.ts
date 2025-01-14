"use server"
import { Browser, executablePath } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: "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"

});

export const scraper = async () => {
    const target_url = 'https://en.wikipedia.org/wiki/Gervonta_Davis';
    puppeteer.use(StealthPlugin());
    const browser: Browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(target_url, {
        waitUntil: "networkidle0",
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const imgBase64 = await page.screenshot({
        path: "screenshot.png",
        fullPage: true,
        encoding: 'base64',
    });

    await browser.close();

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [{ type: "text",
                        text:
                            `Extract detailed information about the boxer from the image in the following JSON format:
                {
                    name,
                    city,
                    stats: { age, height, weight, reach, stance },
                    record: { total-wins, wins, KO(wins by ko in percentage), ranking { wbo, ring... }, belts: { list of the boxer's currently held belts by organization } },
                    matches: [
                        { match_number, result, record, opponent, type, round, time, date, location, notes }
                    ]
                }`,
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/png;base64,${imgBase64}`,
                        }
                    },
                ],
            },
        ],
    });

    console.log("Response:", response);
    console.log("Details:", response.choices[0]?.message?.content);
};

await scraper();
