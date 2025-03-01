"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { useIsClient } from "@/hooks/useClient";
import { FighterProps } from "@/types/fighterType";

gsap.registerPlugin(ScrollTrigger);

interface EventProps {
    children: React.ReactNode;
    fighter1?: FighterProps | null;
    fighter2?: FighterProps | null;
}

export const Event = ({ children, fighter1, fighter2 }: EventProps) => {
    const isClient = useIsClient();
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation for the event component
    useGSAP(() => {
        if (!containerRef.current || !isClient) return;
        // Get the first three children
        gsap.fromTo(
            containerRef.current.children,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: true,
                },
            }
        );
    }, [isClient]);

    return (
        (!isClient ? <SkeletonLoader /> : (
            <>
                <div ref={containerRef} className="relative -mb-2 text-4xl lg:text-9xl">
                    <h2 className="font-semibold lg:-mb-20">{fighter1?.name || fighter1?.nickname}</h2>
                    <h2 className="font-medium italic text-red-500 pl-3">vs</h2>
                    <h2 className="font-semibold lg:-mt-14">{fighter2?.name || fighter2?.nickname}</h2>
                </div>
                {children}
            </>
        )))
}

const SkeletonLoader = () => (
    <div className="w-[800px] animate-pulse flex flex-col gap-2">
        <div className="bg-gray-300 h-16"></div>
        <div className="bg-gray-300 h-16"></div>
        <div className="bg-gray-300 h-16 mb-6"></div>
    </div>
);