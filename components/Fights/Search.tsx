"use client"
import { useFights } from "@/context/fightsContext";
import { handleSearch } from "@/services/fightsServices";
import { useEffect, useState } from "react";

export const Search = ({ start, end }: { start: number, end: number }) => {
    const { setFights } = useFights();

    const [query, setQuery] = useState('');
    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { fetchedFights, totalFights } = await handleSearch(query, start, end);
            setFights({
                fights: JSON.parse(JSON.stringify(fetchedFights)),
                totalFights: totalFights,
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, start, end, setFights]);

    return (
        <input
            className="bg-gray-100 text-center text-2xl font-semibold py-2 px-4 rounded-md"
            type="text"
            name="query"
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
    )
}