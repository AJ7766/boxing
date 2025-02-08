import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

export const getFights = async (start: number, end: number) => {
    const today = DateTime.local();  // Current date
    const oneWeekAgo = today.minus({ week: 1 }).toJSDate(); // 1 week ago

    const fightsPromise = prisma.fight.findMany({
        where: {
            date: {
                gte: oneWeekAgo,   // Date greater than or equal to 1 week ago
            },
            titles: {
                some: {}  // Ensures there is at least one title related to the fight
            },
        },
        skip: start,
        take: end - start,
        select: {
            title: true,
            fighter1: {
                select: {
                    name: true,
                    nickname: true,
                    wins: true,
                    losses: true,
                    draws: true,
                    total_bouts: true,
                    ko_wins: true,
                    stopped: true,
                },
            },
            fighter2: {
                select: {
                    name: true,
                    nickname: true,
                    wins: true,
                    losses: true,
                    draws: true,
                    total_bouts: true,
                    ko_wins: true,
                    stopped: true,
                },
            },
            date: true,
            location: true,
            divisionName: true,
            scheduledRounds: true,
            titles: true,
        },
        orderBy: {
            date: 'asc', // Sort by date in ascending order (earliest first)
        },
    });

    const totalFightsPromise = prisma.fight.count({
        where: {
            date: {
                gte: oneWeekAgo,
            },
            titles: {
                some: {},
            },
        },
    });

    const [fights, totalFights] = await Promise.all([fightsPromise, totalFightsPromise]);

    return { fights, totalFights };
}


export const getSearchParams = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    // Getting searchParams and returning the values
    const currParams = await searchParams;
    const page = currParams?.page ?? '1'; // if 'page' in params otherwise default '1'
    const per_page = currParams?.per_page ?? '8'; // if 'per_page' in params otherwise default '10'

    const start = (Number(page) - 1) * Number(per_page); // Calculate start of the page 0, 5, 10...
    const end = start + Number(per_page); // Calculate end of the page 5, 10 ,15...
    return { page, per_page, start, end }
}