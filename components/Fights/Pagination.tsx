"use client"
import { useFights } from "@/context/FightsContext";
import Link from "next/link";

interface PaginationProps {
    page: string | string[];
    per_page: string | string[];
    start: number;
    end: number;
}

export const Pagination = ({ page, per_page, start, end }: PaginationProps) => {
    const { fights } = useFights();

    const prevPage = Number(page) > 1 ? Number(page) - 1 : 1;
    const nextPage = Number(page) + 1;
    const hasPrevPage = start > 1 && (fights.totalFights ?? 0) >= Number(per_page); // if start > 1 and totalFights >= 8
    const hasNextPage = end < (fights.totalFights ?? 0);

    // Calculate total pages available
    const totalPages = Math.ceil((fights.totalFights ?? 0) / Number(per_page));

    return (
        <div className="font-medium flex gap-1 items-center m-auto ">
            {hasPrevPage &&
                <Link href={`?page=${prevPage}&per_page=${per_page}`} scroll={false}>
                    <button>Previous</button>
                </Link>
            }
            {/* Render page numbers */}
            {Array.from({ length: totalPages ?? 0 }, (_, index) => index + 1).map((number) => (
                <Link key={number} href={`?page=${number}&per_page=${per_page}`} scroll={false}>
                    <button
                        className={`py-[2px] px-3 ${Number(page) === number && 'bg-gray-100 rounded-md'}`}
                    >
                        {number}
                    </button>
                </Link>
            ))}
            {hasNextPage &&
                <Link href={`?page=${nextPage}&per_page=${per_page}`} scroll={false}>
                    <button>Next</button>
                </Link>
            }
        </div>
    )
}