"use client"
import { RankingsProps } from '@/types/rankingsTypes'
import React, { useCallback, useEffect, useState } from 'react'

export const Table = ({ mensRankings, womensRankings }: { mensRankings: RankingsProps[], womensRankings: RankingsProps[] }) => {
    const [womens, setWomens] = useState(false);
    const [sortedRankings, setSortedRankings] = useState({
        ranking: mensRankings as RankingsProps[],
        selectedRanking: 'theRing'
    });

    useEffect(() => {
        setSortedRankings({
            ranking: womens ? womensRankings : mensRankings,
            selectedRanking: 'theRing'
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [womens]);

    const handleSort = useCallback((key: keyof RankingsProps) => {
        setSortedRankings(prev => {
            const sorted = [...prev.ranking].sort((a, b) => {
                const aValue = Number(a[key]?.match(/(\d+)/)?.[0]) || Infinity;
                const bValue = Number(b[key]?.match(/(\d+)/)?.[0]) || Infinity;
                return aValue - bValue;
            });
            return {
                ranking: sorted,
                selectedRanking: key
            };
        });
    }, []);

    return (
        <>
            <div className='flex text-2xl font-semibold justify-center mt-10'>
                <CategoryButton womens={!womens} category="Men" onClick={() => setWomens(false)} />
                <CategoryButton womens={womens} category="Women" onClick={() => setWomens(true)} />
            </div>
            <div className='relative mt-6 overflow-x-auto'>
                <table className='mx-auto font-medium table-collapse'>
                    <thead>
                        <tr>
                            <TableHeader rowSpan={2}>Boxer</TableHeader>
                            <TableHeader rowSpan={2}>Record</TableHeader>
                            <TableHeader rowSpan={2}>Weight Class</TableHeader>
                            <TableHeader rowSpan={2}>Current World Titles</TableHeader>
                            <TableHeader colSpan={womens ? 3 : 5}>Ranker</TableHeader>
                        </tr>
                        <tr className="border-b-2 border-gray-500 cursor-pointer">
                            <TableHeader
                                active={sortedRankings.selectedRanking === 'theRing'}
                                onClick={() => handleSort('theRing')}>The Ring</TableHeader>
                            {/* Only render womens columns if womens is true */}
                            {!womens &&
                                <>
                                    <TableHeader
                                        active={sortedRankings.selectedRanking === 'bwaa'}
                                        onClick={() => handleSort('bwaa')}>BWAA</TableHeader>
                                    <TableHeader
                                        active={sortedRankings.selectedRanking === 'tbrb'}
                                        onClick={() => handleSort('tbrb')}>TBRB</TableHeader>
                                </>
                            }
                            <TableHeader
                                active={sortedRankings.selectedRanking === 'espn'}
                                onClick={() => handleSort('espn')}>ESPN</TableHeader>
                            <TableHeader
                                active={sortedRankings.selectedRanking === 'boxRec'}
                                onClick={() => handleSort('boxRec')}>BoxRec</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRankings.ranking.map((ranking) => (
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
                                {!womens &&
                                    <>
                                        <TableCell>{ranking.bwaa}</TableCell>
                                        <TableCell>{ranking.tbrb}</TableCell>
                                    </>
                                }
                                <TableCell>{ranking.espn}</TableCell>
                                <TableCell>{ranking.boxRec}</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div >
        </>
    )
}

const CategoryButton = ({ womens, category, onClick }: { womens: boolean, category: string, onClick: () => void }) => {
    return <button className={`relative px-3 py-2 
        after:content-[''] after:absolute after:bottom-2 after:h-[2.5px] after:left-1/2 after:-translate-x-1/2 after:bg-red-600 after:transition-[width] after:duration-300 
        ${womens ? 'after:w-2/5' : 'after:w-0 hover:after:w-[calc(100%-24px)]'}`} onClick={onClick}>{category}&apos;s</button>
}

const TableHeader = ({ children, active, rowSpan, colSpan, onClick }: { children: React.ReactNode, active?: boolean, rowSpan?: number, colSpan?: number, onClick?: () => void }) => {

    const pseudoActiveClass =
        "after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/4 after:h-[1.7px] after:bg-red-600 after:transition-[opacity] after:opacity-100 after:duration-300";

    return (
        <th
            className={`relative px-4 py-2 border border-gray-300 ${onClick && 'cursor-pointer'} after:opacity-0 ${active && pseudoActiveClass}`}
            onClick={onClick}
            rowSpan={rowSpan}
            colSpan={colSpan}
        >
            {children}
        </th>
    )
}

const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <td className={`px-4 py-2 border border-gray-300 ${className}`}>{children}</td>
);