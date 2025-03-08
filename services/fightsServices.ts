"use server"
import { prisma } from "@/lib/prisma";

export const getSearchParams = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    // Getting searchParams and returning the values
    const currParams = await searchParams;
    const page = currParams?.page ?? '1'; // if 'page' in params otherwise default '1'
    const per_page = currParams?.per_page ?? '10'; // if 'per_page' in params otherwise default '10'

    const start = (Number(page) - 1) * Number(per_page); // Calculate start of the page 0, 5, 10...
    const end = start + Number(per_page); // Calculate end of the page 5, 10 ,15...
    return { page, per_page, start, end }
}

export const getFights = async (query: string, start: number, end: number, oneWeekAgo: Date) => {
    const [fights, totalFights] = await prisma.$transaction([
        prisma.fight.findMany({
            where: {
                OR: query
                    ? [
                        { title: { contains: query, mode: 'insensitive' } },
                        { fighter1: { name: { contains: query, mode: 'insensitive' } } },
                        { fighter2: { name: { contains: query, mode: 'insensitive' } } }
                    ]
                    : undefined,
                date: { gte: oneWeekAgo },
            },
            skip: query ? 0 : start,
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
                division: true,
                broadcasters: true,
                scheduledRounds: true,
                titles: true,
            },
            orderBy: { date: 'asc' },
        }),
        prisma.fight.count({
            where: {
                OR: query
                    ? [
                        { title: { contains: query, mode: 'insensitive' } },
                        { fighter1: { name: { contains: query, mode: 'insensitive' } } },
                        { fighter2: { name: { contains: query, mode: 'insensitive' } } }
                    ]
                    : undefined,
                date: { gte: oneWeekAgo },
            },
        }),
    ]);

    return { fights, totalFights };
};
