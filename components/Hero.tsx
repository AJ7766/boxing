"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);

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
    return <section ref={heroRef} className="bg-[url(../public/bg.webp)] bg-fixed min-h-screen bg-cover bg-left max-h-screen w-full lg:bg-center" />
}