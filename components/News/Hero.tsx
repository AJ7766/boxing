"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dazn } from "@/fonts/fonts";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    return (
        <div className="h-screen w-full">
            <section className={`${dazn.className} fixed h-full w-full bg-[#f7fe19] font-semibold text-[8.5vw] leading-[1.1] flex items-center flex-col justify-center -z-10`}>
                <h1>RYAN GARCIA</h1>
                <h1>VS</h1>
                <h1>ROLLY ROMERO</h1>
            </section>
        </div>
    )
}