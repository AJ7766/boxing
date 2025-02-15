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
                const aValue = Number(a[key]?.match(/(\d+)/)?.[1]) || NaN;
                const bValue = Number(b[key]?.match(/(\d+)/)?.[1]) || NaN;

                if (isNaN(aValue) && isNaN(bValue)) return 0;
                if (isNaN(aValue)) return 1;
                if (isNaN(bValue)) return -1;

                return aValue - bValue;
            });
            return sorted;
        });
    }, [sortedRankings]);

    useEffect(() => {
        handleSort('theRing');
    }, [])

    return (
        <>
            <div className='flex text-2xl font-medium justify-center'>
                <button className={`px-3 py-2 ${!womens && 'bg-gray-200'}`} onClick={() => setWomens(false)}>Men&apos;s</button>
                <button className={`px-3 ${womens && 'bg-gray-200'}`} onClick={() => setWomens(true)}>Women&apos;s</button>
            </div>
            <div className='mt-6'>
                <table className='mx-auto font-medium table-collapse'>
                    <thead>
                        <tr>
                            <th rowSpan={2} className="px-4 py-2 border border-gray-300">Boxer</th>
                            <th rowSpan={2} className="px-4 py-2 border border-gray-300">Record</th>
                            <th rowSpan={2} className="px-4 py-2 border border-gray-300">Weight Class</th>
                            <th rowSpan={2} className="px-4 py-2 border border-gray-300">Current World Titles</th>
                            <th colSpan={womens ? 3 : 5} className="px-4 py-2 border border-gray-300">Ranker</th>
                        </tr>
                        <tr className="border-b-2 border-gray-500 cursor-pointer">
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort('theRing')}>The Ring</th>
                            {!womens && <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort('bwaa')}>BWAA</th>}
                            {!womens && <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort('tbrb')}>TBRB</th>}
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort('espn')}>ESPN</th>
                            <th className="px-4 py-2 border border-gray-300" onClick={() => handleSort('boxRec')}>BoxRec</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRankings.map((ranking) => (
                            <tr key={ranking.id} className="border-b border-gray-300">
                                <td className="px-4 py-2 border border-gray-300">{ranking.boxer}</td>
                                <td className="px-4 py-2 border border-gray-300">{ranking.record}</td>
                                <td className="px-4 py-2 border border-gray-300">{ranking.weightClass}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-normal break-words">
                                    {ranking.currentWorldTitles &&
                                        ranking.currentWorldTitles
                                            .split(', ') // Split by comma
                                            .map((title, index, arr) => (
                                                <span key={index} className={index > 0 && index % 3 === 0 ? 'block' : ''}>
                                                    {title}
                                                    {index < arr.length - 1 && !arr[index + 1].includes('and') ? ', ' : ' '}
                                                </span>
                                            ))}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">{ranking.theRing}</td>
                                {!womens && <td className="px-4 py-2 border border-gray-300">{ranking.bwaa}</td>}
                                {!womens && <td className="px-4 py-2 border border-gray-300">{ranking.tbrb}</td>}
                                <td className="px-4 py-2 border border-gray-300">{ranking.espn}</td>
                                <td className="px-4 py-2 border border-gray-300">{ranking.boxRec}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}