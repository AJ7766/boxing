"use client"
import { RankingsProps } from '@/types/rankingsTypes';
import React, { useCallback, useEffect, useState } from 'react'

export const Table = ({ mensRankings, womensRankings }: { mensRankings: RankingsProps[], womensRankings: RankingsProps[] }) => {
    const [womens, setWomens] = useState(false);
    const [sortedRankings, setSortedRankings] = useState<RankingsProps[]>(mensRankings);

    useEffect(() => {
        setSortedRankings(womens ? womensRankings : mensRankings);
    }, [womens, mensRankings, womensRankings]);

    const handleSort = useCallback((key: keyof RankingsProps) => {
        setSortedRankings(prevRankings => {
            const sorted = [...prevRankings].sort((a, b) => {
                const aValue = Number(a[key]?.match(/(\d+)/)?.[0]) || Infinity;
                const bValue = Number(b[key]?.match(/(\d+)/)?.[0]) || Infinity;

                return aValue - bValue;
            });
            return sorted;
        });
    }, [sortedRankings]);

    return (
        <>
            <div className='flex text-2xl font-medium justify-center'>
                <button className={`px-3 py-2 ${!womens && 'bg-gray-200 rounded'}`} onClick={() => setWomens(false)}>Men&apos;s</button>
                <button className={`px-3 ${womens && 'bg-gray-200 rounded'}`} onClick={() => setWomens(true)}>Women&apos;s</button>
            </div>
            <div className='mt-6'>
                <table className='mx-auto font-medium table-collapse'>
                    <thead>
                        <tr>
                            <TableHeader rowSpan={2}>Test</TableHeader>
                            <TableHeader rowSpan={2}>Record</TableHeader>
                            <TableHeader rowSpan={2}>Weight Class</TableHeader>
                            <TableHeader rowSpan={2}>Current World Titles</TableHeader>
                            <TableHeader colSpan={womens ? 3 : 5}>Ranker</TableHeader>
                        </tr>
                        <tr className="border-b-2 border-gray-500 cursor-pointer">
                            <TableHeader onClick={() => handleSort('theRing')}>The Ring</TableHeader>
                            {!womens && <TableHeader onClick={() => handleSort('bwaa')}>BWAA</TableHeader>}
                            {!womens && <TableHeader onClick={() => handleSort('tbrb')}>TBRB</TableHeader>}
                            <TableHeader onClick={() => handleSort('espn')}>ESPN</TableHeader>
                            <TableHeader onClick={() => handleSort('boxRec')}>BoxRec</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRankings.map((ranking) => (
                            <tr key={ranking.id} className="border-b border-gray-300">
                                <TableCell>{ranking.boxer}</TableCell>
                                <TableCell>{ranking.record}</TableCell>
                                <TableCell>{ranking.weightClass}</TableCell>
                                <TableCell className="whitespace-normal break-words">
                                    {ranking.currentWorldTitles &&
                                        ranking.currentWorldTitles
                                            .split(', ') // Split by comma
                                            .map((title, index, arr) => (
                                                <span key={index} className={index > 0 && index % 3 === 0 ? 'block' : ''}>
                                                    {title}
                                                    {index < arr.length - 1 && !arr[index + 1].includes('and') ? ', ' : ' '}
                                                </span>
                                            ))}
                                </TableCell>
                                <TableCell>{ranking.theRing}</TableCell>
                                {!womens && <TableCell>{ranking.bwaa}</TableCell>}
                                {!womens && <TableCell>{ranking.tbrb}</TableCell>}
                                <TableCell>{ranking.espn}</TableCell>
                                <TableCell>{ranking.boxRec}</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const TableHeader = ({ children, rowSpan, colSpan, onClick }: { children: React.ReactNode, rowSpan?: number, colSpan?: number, onClick?: () => void }) => (
    <th
        className={`px-4 py-2 border border-gray-300 ${onClick && 'cursor-pointer'}`}
        onClick={onClick}
        rowSpan={rowSpan}
        colSpan={colSpan}
    >
        {children}
    </th>
);

const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <td className={`px-4 py-2 border border-gray-300 ${className}`}>{children}</td>
);