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
        const tween = gsap.fromTo(
            overlayRef.current,
            { width: "100%" },
            { width: "0%", duration: 0.66, ease: "steps(25)", paused: true }
        );
        // Create a ScrollTrigger to control the tween
        ScrollTrigger.create({
            trigger: overlayRef.current,
            start: "bottom 90%",
            onEnter: () => tween.play(),
            onLeaveBack: () => tween.reverse()
        });
    }, [isClient]);

    return (
        <div className="relative w-fit mx-auto">
            <h2 className="text-4xl font-semibold relative text-center">
                {children}
                {/* Overlay Div to Simulate Pseudo-Element */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 -translate-x-full left-full bg-white"
                />
            </h2>
        </div>
    );
};
