"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { Fighter } from "@/types/fightsType";
import { useIsClient } from "@/hooks/useClient";

gsap.registerPlugin(ScrollTrigger);

interface EventProps {
    children: React.ReactNode;
    fighter1: Fighter;
    fighter2: Fighter;
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
        <div className="relative">
            {!isClient ? <SkeletonLoader /> : (
                <div ref={containerRef} className="text-9xl -mb-2">
                    <h1 className="font-semibold -mb-20">{fighter1.full_name || fighter1.name}</h1>
                    <h1 className="font-medium italic text-red-500 pl-3">vs</h1>
                    <h1 className="font-semibold -mt-14">{fighter2.full_name || fighter2.name}</h1>
                </div>
            )}
            {children}
        </div>
    )
}

const SkeletonLoader = () => (
    <div className="w-[800px] animate-pulse flex flex-col gap-2">
        <div className="bg-gray-300 h-16"></div>
        <div className="bg-gray-300 h-16"></div>
        <div className="bg-gray-300 h-16 mb-6"></div>
    </div>
);