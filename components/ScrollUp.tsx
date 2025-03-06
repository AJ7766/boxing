"use client"
import { useIsClient } from '@/hooks/useClient';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import gsap from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const ScrollUp = () => {
    const isClient = useIsClient();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setIsScrolled(window.scrollY > 200);

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, [isClient])

    const handleScroll = () =>
        gsap.to(window, { scrollTo: 0, duration: 1, ease: "power2.inOut" });

    if (!isClient) return;

    return <Image
        className={`fixed bottom-6 right-6 h-9 w-9 p-2 rounded-full shadow-md bg-white cursor-pointer ${isScrolled ? "opacity-100" : "opacity-0"} transition-all duration-500 hover:bg-yellow-200 z-20`}
        src="/arrow-up.svg"
        width={32}
        height={32}
        onClick={handleScroll}
        alt="Scroll up" />
}