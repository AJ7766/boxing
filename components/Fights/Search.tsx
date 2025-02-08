"use client"
import { useFights } from "@/context/fightsContext";

export const Search = () => {
    const { setFights } = useFights();
    return (
        <>
            <label htmlFor="searchQuery" className="sr-only">
                Search for a fight
            </label>
            <input
                id="searchQuery"
                className="bg-gray-100 max-w-[850px] w-full mx-auto text-center text-2xl font-semibold py-2 px-4 rounded-md"
                type="text"
                name="query"
                placeholder="Search for a fight"
                onInput={(e) => setFights(prev => ({
                    ...prev,
                    query: (e.target as HTMLInputElement).value,
                }))}
            />
        </>
    )
}