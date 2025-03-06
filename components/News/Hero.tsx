"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { dazn } from "@/fonts/fonts";
import { useIsClient } from "@/hooks/useClient";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const isClient = useIsClient();
    const heroRef = useRef<HTMLElement>(null);
    
    useGSAP(() => {
        if (!heroRef.current || !isClient) return;

        gsap.to(
            heroRef.current,
            { backgroundColor: "black", opacity: 0.85,
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
        <div className="h-screen w-full">
            <section ref={heroRef} className={`${dazn.className} fixed h-full w-full bg-[#f7fe19] font-semibold text-[8.5vw] leading-[1.1] flex items-center flex-col justify-center -z-10`}>
                <h1>RYAN GARCIA</h1>
                <h1>VS</h1>
                <h1>ROLLY ROMERO</h1>
            </section>
        </div>
    )
}