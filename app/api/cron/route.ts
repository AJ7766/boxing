import { prisma } from "@/lib/prisma";
import { TitleProps } from "@/types/fighterType";
import { NextRequest, NextResponse } from "next/server";
import { getRankings } from "./services";
import { BroadcastProps } from "@/types/fightsType";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    await fetchData();
    return NextResponse.json({ message: "Data fetched successfully" });
}

const fetchData = async () => {
    const metadata = await prisma.metadata.findUnique({
        where: { id: 1 },
    });

    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

    if (metadata?.lastFetchedAt && metadata.lastFetchedAt > twelveHoursAgo) {
        console.log("Skipping fetch: Data was updated recently.");
        return;
    }

    console.log("Fetching new data...");
    await fetchTitles();
    await fetchFighters();
    await fetchFights();
    await fetchRankings();

    await prisma.metadata.upsert({
        where: { id: 1 },
        update: { lastFetchedAt: now },
        create: { id: 1, lastFetchedAt: now },
    });

    console.log("Finished fetching data");
}

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.API_KEY as string,
        'x-rapidapi-host': process.env.API_HOST as string
    }
};

const fetchTitles = async () => {
    const url = `${process.env.API_URL}/v1/titles/?page_num=1&page_size=200`;
    const res = await fetch(url, options);
    const titles = await res.json();
    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];

        // Use upsert to avoid duplicate titles based on the unique id field
        await prisma.title.upsert({
            where: { id: title.id },
            update: {
                name: title.name,
            },
            create: {
                id: title.id,
                name: title.name,
            },
        });
    }
    console.log("Finished fetching titles");
};

const fetchFighters = async () => {
    const url = `${process.env.API_URL}/v1/fighters/?page_num=1&page_size=5000`;
    const res = await fetch(url, options);
    const fighters = await res.json();

    for (let i = 0; i < fighters.length; i++) {
        const fighter = fighters[i];

        await prisma.fighter.upsert({
            where: { id: fighter.id },
            update: {
                name: fighter.name || null,
                age: fighter.age || null,
                gender: fighter.gender || null,
                height: fighter.height || null,
                nationality: fighter.nationality || null,
                nickname: fighter.nickname || null,
                reach: fighter.reach || null,
                stance: fighter.stance || null,
                wins: fighter.stats?.wins || null,
                losses: fighter.stats?.losses || null,
                draws: fighter.stats?.draws || null,
                total_bouts: fighter.stats?.total_bouts || null,
                total_rounds: fighter.stats?.total_rounds || null,
                ko_percentage: fighter.stats?.ko_percentage || null,
                ko_wins: fighter.stats?.ko_wins || null,
                stopped: fighter.stats?.stopped || null,
                debut: fighter.debut || null,
                division: fighter.division?.name || null,
                divisionSlug: fighter.division?.slug || null,
                weightLb: fighter.division?.weight_lb || null,
                weightKg: fighter.division?.weight_kg || null,
            },
            create: {
                id: fighter.id,
                name: fighter.name || null,
                age: fighter.age || null,
                gender: fighter.gender || null,
                height: fighter.height || null,
                nationality: fighter.nationality || null,
                nickname: fighter.nickname || null,
                reach: fighter.reach || null,
                stance: fighter.stance || null,
                wins: fighter.stats?.wins || null,
                losses: fighter.stats?.losses || null,
                draws: fighter.stats?.draws || null,
                total_bouts: fighter.stats?.total_bouts || null,
                total_rounds: fighter.stats?.total_rounds || null,
                ko_percentage: fighter.stats?.ko_percentage || null,
                ko_wins: fighter.stats?.ko_wins || null,
                stopped: fighter.stats?.stopped || null,
                debut: fighter.debut || null,
                division: fighter.division?.name || null,
                divisionSlug: fighter.division?.slug || null,
                weightLb: fighter.division?.weight_lb || null,
                weightKg: fighter.division?.weight_kg || null,
            },
        });
    }
    console.log("Finished fetching fighters");
};

const fetchFights = async () => {
    const url = `${process.env.API_URL}/v1/fights/?page_num=1&page_size=10000`;
    const res = await fetch(url, options);
    const fights = await res.json();

    for (let i = 0; i < fights.length; i++) {
        const fight = fights[i];

        const broadcasters = fight.event.broadcasters?.map((broadcaster: BroadcastProps) => {
            const [country, network] = Object.entries(broadcaster)[0]; // Extract key-value correctly
            return {
                country,  // key is country
                network,  // value is network
            };
        }) || [];


        await prisma.fight.upsert({
            where: { id: fight.id },
            update: {
                title: fight.title || null,
                date: fight.date ? new Date(fight.date) : null,
                location: fight.location || null,
                result: fight.results ? {
                    outcome: fight.results.outcome ?? null,
                    round: fight.results.round ?? null,
                } as Prisma.JsonObject : Prisma.JsonNull,
                scheduledRounds: fight.scheduled_rounds || null,
                scores: fight.scores || [],
                status: fight.status || null,
                division: fight.division?.name || null,
                titles: {
                    connect: fight.titles?.map((title: TitleProps) => ({
                        id: title.id,
                    })) || [],
                },
                broadcasters: broadcasters as Prisma.JsonObject|| [],
                fighter1Id: fight.fighters.fighter_1.fighter_id || null,
                fighter2Id: fight.fighters.fighter_2.fighter_id || null,
            },
            create: {
                id: fight.id,
                title: fight.title || null,
                date: fight.date ? new Date(fight.date) : null,
                location: fight.location || null,
                result: fight.results ? {
                    outcome: fight.results.outcome ?? null,
                    round: fight.results.round ?? null,
                } as Prisma.JsonObject : Prisma.JsonNull,
                scheduledRounds: fight.scheduled_rounds || null,
                scores: fight.scores || [],
                status: fight.status || null,
                division: fight.division?.name || null,
                titles: {
                    connect: fight.titles?.map((title: TitleProps) => ({
                        id: title.id,
                    })) || [],
                },
                broadcasters: broadcasters as Prisma.JsonObject || [],
                fighter1Id: fight.fighters.fighter_1.fighter_id || null,
                fighter2Id: fight.fighters.fighter_2.fighter_id || null,
            },
        });
    }
    console.log("Finished fetching fights: " + fights.length);
};

const fetchRankings = async () => {
    const { mensScrapedRankings, womensCrapedRankings } = await getRankings();

    // Create an array to hold promises for mensRankings
    const mensRankingPromises = mensScrapedRankings.map((ranking) => {
        return prisma.mensRankings.upsert({
            where: { id: ranking.id }, // Use id as the unique identifier for mensRankings
            update: {
                boxer: ranking.boxer || '-',
                record: ranking.record || '-',
                weightClass: ranking.weightClass || '-',
                currentWorldTitles: ranking.currentWorldTitles || '-',
                theRing: ranking.theRing || '-',
                bwaa: ranking.bwaa || '-',
                tbrb: ranking.tbrb || '-',
                espn: ranking.espn || '-',
                boxRec: ranking.boxRec || '-'
            },
            create: {
                id: ranking.id, // Ensure to pass the id for new records
                boxer: ranking.boxer || '-',
                record: ranking.record || '-',
                weightClass: ranking.weightClass || '-',
                currentWorldTitles: ranking.currentWorldTitles || '-',
                theRing: ranking.theRing || '-',
                bwaa: ranking.bwaa || '-',
                tbrb: ranking.tbrb || '-',
                espn: ranking.espn || '-',
                boxRec: ranking.boxRec || '-'
            }
        });
    });

    // Create an array to hold promises for womensRankings
    const womensRankingPromises = womensCrapedRankings.map((ranking) => {
        return prisma.womensRankings.upsert({
            where: { id: ranking.id }, // Use id as the unique identifier for womensRankings
            update: {
                boxer: ranking.boxer || '-',
                record: ranking.record || '-',
                weightClass: ranking.weightClass || '-',
                currentWorldTitles: ranking.currentWorldTitles || '-',
                theRing: ranking.theRing || '-',
                espn: ranking.espn || '-',
                boxRec: ranking.boxRec || '-'
            },
            create: {
                id: ranking.id, // Ensure to pass the id for new records
                boxer: ranking.boxer || '-',
                record: ranking.record || '-',
                weightClass: ranking.weightClass || '-',
                currentWorldTitles: ranking.currentWorldTitles || '-',
                theRing: ranking.theRing || '-',
                espn: ranking.espn || '-',
                boxRec: ranking.boxRec || '-'
            }
        });
    });

    // Wait for all promises to resolve
    await Promise.all([...mensRankingPromises, ...womensRankingPromises]);

    console.log("Finished Mens Rankings: " + mensRankingPromises.length, "Finished Womens Rankings: " + womensRankingPromises.length);
}
