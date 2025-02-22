"use client"
import { useFights } from "@/context/FightsContext";
import { useEffect, useState } from "react";

export const Search = () => {
    const { setQuery } = useFights();
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setQuery(debounceValue)
        }, 300);

        // Cleanup the timeout if the query changes before 300ms
        return () => {
            clearTimeout(handler);
        };
    }, [debounceValue, setQuery]);

    return (
        <>
            <label htmlFor="searchQuery" className="sr-only">
                Search for a fight
            </label>
            <input
                id="searchQuery"
                className="bg-gray-100 max-w-[900px] w-full rounded-md text-center text-2xl font-semibold py-2 mx-auto"
                type="text"
                name="query"
                placeholder="Search for a fight"
                onInput={(e) => setDebounceValue((e.target as HTMLInputElement).value)}
            />
        </>
    );
};
