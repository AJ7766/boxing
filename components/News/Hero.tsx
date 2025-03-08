"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dazn } from "@/fonts/fonts";

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ fighter1, fighter2 }: { fighter1?: string | null, fighter2?: string | null }) => {
    return (
        <div className="h-screen w-full">
            <section className={`${dazn.className} fixed h-full w-full bg-[#f7fe19] font-semibold text-[8vw] leading-[1.1] flex items-center flex-col justify-center -z-10`}>
                <span>{fighter1}</span>
                <span>VS</span>
                <span>{fighter2}</span>
            </section>
        </div>
    )
}