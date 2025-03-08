import { prisma } from "@/lib/prisma";
import { TitleProps } from "@/types/fighterType";
import { NextRequest, NextResponse } from "next/server";
import { scrapeRankings } from "./services";
import { BroadcastProps } from "@/types/fightsType";
import pLimit from "p-limit";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }
    await fetchData();
    return NextResponse.json({ message: "Data fetched successfully" });
}

const limit = pLimit(5);
const batchSize = 100; 

const fetchData = async () => {
    const metadata = await prisma.metadata.findUnique({ where: { id: 1 } });
    const now = new Date();
    if (metadata?.lastFetchedAt && metadata.lastFetchedAt > new Date(now.getTime() - 23 * 60 * 60 * 1000)) {
        console.log("Skipping fetch: Data was updated recently.");
        return;
    }

    console.log("Fetching new data...");
    await Promise.all([
        limit(fetchTitles),
        limit(fetchFighters),
        limit(fetchFights),
        limit(fetchRankings)
    ]);

    await prisma.metadata.upsert({
        where: { id: 1 },
        update: { lastFetchedAt: now },
        create: { id: 1, lastFetchedAt: now },
    });
    console.log("Finished fetching data");
};

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.API_KEY as string,
        'x-rapidapi-host': process.env.API_HOST as string
    }
};

const batchProcess = async (items: any[], handler: (batch: any[]) => Promise<void>) => {
    for (let i = 0; i < items.length; i += batchSize) {
        await limit(() => handler(items.slice(i, i + batchSize)));
    }
};

const fetchTitles = async () => {
    const res = await fetch(`${process.env.API_URL}/v1/titles/?page_num=1&page_size=200`, options);
    const titles: TitleProps[] = await res.json();

    await batchProcess(titles, async (batch) => {
        await prisma.title.createMany({ data: batch, skipDuplicates: true });
    });
    console.log("Finished fetching titles", titles.length);
};

const fetchFighters = async () => {
    const res = await fetch(`${process.env.API_URL}/v1/fighters/?page_num=1&page_size=5000`, options);
    const fighters = await res.json();

    await batchProcess(fighters, async (batch) => {
        await prisma.fighter.createMany({ data: batch, skipDuplicates: true });
    });
    console.log("Finished fetching fighters", fighters.length);
};

const fetchFights = async () => {
    const res = await fetch(`${process.env.API_URL}/v1/fights/?page_num=1&page_size=10000`, options);
    const fights = await res.json();

    await batchProcess(fights, async (batch) => {
        await prisma.fight.createMany({ data: batch, skipDuplicates: true });
    });
    console.log("Finished fetching fights", fights.length);
};

const fetchRankings = async () => {
    const { mensScrapedRankings, womensCrapedRankings } = await scrapeRankings();
    await Promise.all([
        batchProcess(mensScrapedRankings, async (batch) => {
            await prisma.mensRankings.createMany({ data: batch, skipDuplicates: true });
        }),
        batchProcess(womensCrapedRankings, async (batch) => {
            await prisma.womensRankings.createMany({ data: batch, skipDuplicates: true });
        })
    ]);
    console.log("Finished rankings");
};
