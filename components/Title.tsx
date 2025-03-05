"use client"
import { useIsClient } from "@/hooks/useClient";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Title = ({ children }: { children: string }) => {
    const isClient = useIsClient();
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!overlayRef.current || !isClient) return;
        // Create a tween that animates from full width to 0% width
        gsap.fromTo(
            overlayRef.current,
            { width: "100%" },
            { width: "0%", duration: 0.66, ease: "steps(25)" }
        );
    }, [isClient]);

    return (
        <div className="relative w-fit mx-auto">
            <h3 className="text-5xl font-bold relative text-center">
                {children}
                {/* Overlay div to simulate pseudo-element */}
                <span
                    ref={overlayRef}
                    className="absolute inset-0 -translate-x-full left-full bg-white"
                />
            </h3>
        </div>
    );
};
