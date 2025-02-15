import { Table } from '@/components/Rankings/Table';
import { prisma } from "@/lib/prisma";

export default async function Rankings() {
    const mensRankingsPromise = prisma.mensRankings.findMany({})
    const womensRankingsPromise = prisma.womensRankings.findMany({})

    const [mensRankings, womensRankings] = await Promise.all([mensRankingsPromise, womensRankingsPromise])
    return (
        <main className="bg-white py-12">
            <h2 className="text-center text-4xl font-semibold mb-6">POUND FOR POUND RANKINGS</h2>
            <Table mensRankings={JSON.parse(JSON.stringify(mensRankings))} womensRankings={JSON.parse(JSON.stringify(womensRankings))} />
        </main>
    );
}
