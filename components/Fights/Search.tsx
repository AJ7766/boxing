"use client"
import { useFights } from "@/context/FightsContext";
import { useEffect, useState } from "react";

export const Search = () => {
    const { fights, setFights } = useFights();
    const [query, setQuery] = useState(fights.query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFights(prev => ({
                ...prev,
                query: query,
            }));
        }, 300);

        // Cleanup the timeout if the query changes before 300ms
        return () => {
            clearTimeout(handler);
        };
    }, [query, setFights]);

    return (
        <>
            <label htmlFor="searchQuery" className="sr-only">
                Search for a fight
            </label>
            <input
                id="searchQuery"
                className="bg-gray-100 max-w-[850px] w-full mx-auto text-center text§-2xl font-semibold py-2 px-4 rounded-md"
                type="text"
                name="query"
                placeholder="Search for a fight"
                onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            />
        </>
    );
};
