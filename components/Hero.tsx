"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            heroRef.current,
            { opacity: 1 },
            {
                opacity: 0.3,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "55% 50%",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, []);
    return <div ref={heroRef} className="bg-[url(../public/bg.jpg)] min-h-screen bg-cover bg-center max-h-screen w-full" />
}