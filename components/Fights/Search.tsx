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
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [debounceValue, setDebounceValue] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    useGSAP(() => {
        if (!containerRef.current || !inputRef.current || !isClient) return;

        // Create a timeline with both animations starting simultaneously and with the same easing
        const tl = gsap.timeline({ paused: true, onComplete: () => setShowPlaceholder(true) });
        tl.fromTo(
            containerRef.current,
            { width: "1.5%"},
            { width: "100%", duration: 0.5, ease: "power2.in" }
        )
            .fromTo(
                inputRef.current,
                { height: 0, },
                { height: 'auto', duration: 0.5, ease: "power4.out" }, ">" // Start immediately after the previous animation ends
            )
            .fromTo(
                inputRef.current,
                { backgroundColor: "#111827" },
                { backgroundColor: "#f3f4f6", duration: 1, ease: "power4.out" }, 0 // Start immediately
            );

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "bottom 90%",
            markers: true,
            onEnter: () => tl.play(),
            onLeaveBack: () => {
                setShowPlaceholder(false);
                tl.reverse()
            }
        });
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
        <div ref={containerRef} className="mx-auto max-w-[900px]">
            <label htmlFor="searchQuery" className="sr-only">
                Search for a fight
            </label>
            <input
                ref={inputRef}
                id="searchQuery"
                className="bg-gray-100 w-full rounded-md text-center text-2xl font-semibold py-2 mx-auto"
                type="text"
                name="query"
                placeholder={showPlaceholder ? "Search for a fight" : ""}
                onInput={(e) => setDebounceValue((e.target as HTMLInputElement).value)}
            />
        </div>
    );
};
