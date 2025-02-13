"use client";
import { useLayoutEffect, useState } from "react";
import { LinkC } from "./Link";
import { useIsClient } from "@/hooks/useClient";

export const Nav = () => {
    const isClient = useIsClient();
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    // Add scroll event listener
    useLayoutEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true); // If scrolled more than 80px
            } else {
                setIsScrolled(false); // If scrolled less than 80px
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useLayoutEffect(() => {
        const handleScroll = () => {
            setHasScrolled(true);
            // Remove event listener after first scroll event
            window.removeEventListener("scroll", handleScroll);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`bg-white h-14 flex items-center justify-center -translate-x-1/2 left-1/2 
                ${isScrolled && !hasScrolled
                    ? "transition-[width,position,background-color]"
                    : "transition-[height,width,position,color,background-color]"}
                     duration-700 ease-swoosh z-10`}
            style={{
                height: isClient ? "56px" : "0px",
                width: isScrolled ? "100vw" : "1024px",
                position: isScrolled ? "fixed" : "absolute",
                color: isScrolled ? "white" : "black",
                backgroundColor: isScrolled ? "black" : "white",
                top: isScrolled ? "0" : "80px",
            }}
        >
            <menu className="flex gap-32 font-sans">
                <LinkC name="NEWS" link="" />
                <LinkC name="FIGHTS" link="fights" />
                <LinkC name="RANKINGS" link="rankings" />
                <LinkC name="BOXERS" link="boxers" />
                <LinkC name="ABOUT" link="about" />
            </menu>
        </nav>
    );
};