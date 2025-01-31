"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface EventProps {
    title: string;
    children: React.ReactNode;
}

export const Event = ({ title, children }: EventProps) => {
    const parts = title.split('vs');
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            containerRef.current?.children ?? [],
            { opacity: 0, y: 50 }, // Start position
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.3, // Adds a delay between each h1
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%", // When 80% of the viewport is reached
                    end: "top 30%",
                    scrub: true,
                },
            }
        );
    }, []);
    return (
        <div ref={containerRef}>
            <h1 className="text-9xl font-semibold -mb-20">{parts[0]}</h1>
            <h1 className="text-9xl font-medium italic text-red-500 pl-3">vs</h1>
            <h1 className="text-9xl font-semibold -mt-14">{parts[1]}</h1>
            {children}
        </div>
    )
}