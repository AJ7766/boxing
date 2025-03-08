import { prisma } from "@/lib/prisma";
import { TitleProps } from "@/types/fighterType";
import { NextRequest, NextResponse } from "next/server";
import { scrapeRankings } from "./services";
import { BroadcastProps } from "@/types/fightsType";
import { Prisma } from "@prisma/client";
import pLimit from "p-limit";

export const dynamic = 'force-dynamic'

// Define interfaces for your API responses
interface FighterResponse {
    id: string;
    name?: string;
    age?: number;
    height?: string | null;
    nationality?: string;
    nickname?: string;
    titles?: TitleProps[];
    reach?: string | null;
    stance?: string;
    stats?: {
        wins?: number;
        losses?: number;
        draws?: number;
        total_bouts?: number;
        total_rounds?: number;
        ko_percentage?: number;
        ko_wins?: number;
        stopped?: number;
    };
    debut?: string;
    division?: {
        name?: string;
        weight_lb?: number;
        weight_kg?: number;
    };
}

interface FightResponse {
    id: string;
    title?: string;
    date?: string;
    event: {
        title: string;
        date?: string;
        broadcasters?: BroadcastProps[];
    };
    location?: string;
    results?: {
        outcome?: string;
        round?: number;
    };
    scheduled_rounds?: number;
    scores: string[];
    status?: string;
    division?: {
        name?: string;
    };
    titles?: TitleProps[];
    fighters: {
        fighter_1: { fighter_id: string };
        fighter_2: { fighter_id: string };
    };
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json('Unauthorized', {
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
    const twentyThreeHoursAgo = new Date(now.getTime() - 23 * 60 * 60 * 1000);

    if (metadata?.lastFetchedAt && metadata.lastFetchedAt > twentyThreeHoursAgo) {
        console.log("Skipping fetch: Data was updated recently.");
        return;
    }

    const limit = pLimit(5);

    console.log("Fetching new data...");
    await Promise.all([limit(fetchTitles), limit(fetchFighters), limit(fetchFights), limit(fetchRankings)]);

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
    // Create a limiter with a concurrency of 5
    const limit = pLimit(5);
    await Promise.all(
        titles.map((title: TitleProps) =>
            limit(() =>
                prisma.title.upsert({
                    where: { id: title.id },
                    update: { name: title.name },
                    create: { id: title.id, name: title.name },
                })
            )
        )
    );
    console.log("Finished fetching titles");
};

const fetchFighters = async () => {
    const url = `${process.env.API_URL}/v1/fighters/?page_num=1&page_size=5000`;
    const res = await fetch(url, options);
    const fighters = await res.json();

    const limit = pLimit(5);
    await Promise.all(
        fighters.map((fighter: FighterResponse) =>
            limit(() =>
                prisma.fighter.upsert({
                    where: { id: fighter.id },
                    update: {
                        name: fighter.name || null,
                        age: fighter.age || null,
                        height: fighter.height || null,
                        nationality: fighter.nationality || null,
                        nickname: fighter.nickname || null,
                        titles: {
                            connect:
                                fighter.titles?.map((title: TitleProps) => ({ id: title.id })) || [],
                        },
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
                        weightLb: fighter.division?.weight_lb || null,
                        weightKg: fighter.division?.weight_kg || null,
                    },
                    create: {
                        id: fighter.id,
                        name: fighter.name || null,
                        age: fighter.age || null,
                        height: fighter.height || null,
                        nationality: fighter.nationality || null,
                        nickname: fighter.nickname || null,
                        titles: {
                            connect:
                                fighter.titles?.map((title: TitleProps) => ({ id: title.id })) || [],
                        },
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
                        weightLb: fighter.division?.weight_lb || null,
                        weightKg: fighter.division?.weight_kg || null,
                    },
                })
            )
        )
    );
    console.log("Finished fetching fighters");
};

const fetchFights = async () => {
    const url = `${process.env.API_URL}/v1/fights/?page_num=1&page_size=10000`;
    const res = await fetch(url, options);
    const fights = await res.json();

    const limit = pLimit(5);
    await Promise.all(
        fights.map((fight: FightResponse) => {
            return limit(() =>
                prisma.fight.upsert({
                    where: { id: fight.id },
                    update: {
                        title: fight.title || null,
                        date: fight.date ? new Date(fight.date) : null,
                        eventTitle: fight.event.title || null,
                        eventDate: fight.event.date ? new Date(fight.event.date) : null,
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
                            connect:
                                fight.titles?.map((title: TitleProps) => ({ id: title.id })) || [],
                        },
                        broadcasters: fight.event.broadcasters?.map((broadcaster: BroadcastProps) => {
                            const [country, network] = Object.entries(broadcaster)[0];
                            return {
                                country,
                                network,
                            };
                        }) || [],
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
                            connect:
                                fight.titles?.map((title: TitleProps) => ({ id: title.id })) || [],
                        },
                        broadcasters: fight.event.broadcasters?.map((broadcaster: BroadcastProps) => {
                            const [country, network] = Object.entries(broadcaster)[0];
                            return {
                                country,
                                network,
                            };
                        }) || [],
                        fighter1Id: fight.fighters.fighter_1.fighter_id || null,
                        fighter2Id: fight.fighters.fighter_2.fighter_id || null,
                    },
                })
            )
        })
    );
    console.log("Finished fetching fights: " + fights.length);
};

const fetchRankings = async () => {
    const { mensScrapedRankings, womensCrapedRankings } = await scrapeRankings();
    const limit = pLimit(5);

    // Create an array to hold promises for mensRankings
    const mensRankingPromises = mensScrapedRankings.map((ranking) => {
        return limit(() =>
            prisma.mensRankings.upsert({
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
            })
        );
    });
    // Create an array to hold promises for womensRankings
    const womensRankingPromises = womensCrapedRankings.map((ranking) => {
        return limit(() =>
            prisma.womensRankings.upsert({
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
            })
        );
    });

    // Wait for all promises to resolve
    await Promise.all([...mensRankingPromises, ...womensRankingPromises]);

    console.log("Finished Mens Rankings: " + mensRankingPromises.length, "Finished Womens Rankings: " + womensRankingPromises.length);
}
