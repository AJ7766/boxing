"use client"
import { useFights } from "@/context/FightsContext";
import { useIsClient } from "@/hooks/useClient";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Search = () => {
    const { setQuery } = useFights();
    const isClient = useIsClient();
    const containerRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [debounceValue, setDebounceValue] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    useGSAP(() => {
        if (!containerRef.current || !inputRef.current || !isClient) return;
        // Create a timeline
        const tl = gsap.timeline({ onComplete: () => setShowPlaceholder(true) });
        tl.fromTo(
            containerRef.current,
            { width: "1.5%" },
            { width: "100%", duration: 0.5, ease: "power2.in" }
        )
            .to(
                inputRef.current,
                { height: 'auto', duration: 0.5, ease: "power4.out" }, ">" // Start immediately after the previous animation ends
            )
            .to(
                inputRef.current,
                { backgroundColor: "#f3f4f6", duration: 1, ease: "power4.out" }, 0 // Start immediately
            );
    }, [isClient]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setQuery(debounceValue)
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [debounceValue, setQuery]);

    if (!isClient) return;

    return (
        <search ref={containerRef} className="mx-auto pt-20 pb-8">
            <label htmlFor="searchQuery" className="sr-only">
                Search fight
            </label>
            <input
                ref={inputRef}
                id="searchQuery"
                className="bg-gray-800 w-full h-0 rounded-md text-center text-2xl font-semibold py-2 mx-auto -translate-y-1/2"
                type="text"
                name="query"
                placeholder={showPlaceholder ? "Search fight" : ""}
                onInput={(e) => setDebounceValue((e.target as HTMLInputElement).value)}
            />
        </search>
    );
};