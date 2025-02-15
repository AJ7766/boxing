import { prisma } from "@/lib/prisma"

export const getRankings = async () => {
    const mensRankingsPromise = prisma.mensRankings.findMany({})
    const womensRankingsPromise = prisma.womensRankings.findMany({})

    const [mensRankings, womensRankings] = await Promise.all([mensRankingsPromise, womensRankingsPromise])

    return { mensRankings, womensRankings }
}