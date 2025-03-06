"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { dazn } from "@/fonts/fonts";
import { useIsClient } from "@/hooks/useClient";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const isClient = useIsClient();
    useGSAP(() => {
        if (!heroRef.current || !isClient) return;
        gsap.to(heroRef.current, { backgroundColor: "#f7fe19", duration: 0.5, ease: "power3.in" });

        gsap.fromTo(
            heroRef.current,
            { opacity: 1 },
            {
                opacity: 0.3,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "75% 50%",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, [isClient]);

    return (
        <section ref={heroRef} className={`${dazn.className} bg-black font-semibold h-screen w-screen text-[8.5vw] leading-[1.1] flex items-center flex-col justify-center`}>
            <h1>RYAN GARCIA</h1>
            <h1>VS</h1>
            <h1>ROLLY ROMERO</h1>
        </section>
    )
}