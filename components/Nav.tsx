"use client";
import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export const Nav = () => {
    const [isClient, setIsClient] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll event listener
    useLayoutEffect(() => {
        setIsClient(true);
        const handleScroll = () => {
            if (window.scrollY > 80) {
                console.log("true")
                setScrolled(true); // If scrolled more than 80px
            } else {
                setScrolled(false); // If scrolled less than 80px
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`bg-white flex items-center justify-center -translate-x-1/2 left-1/2 transition-[height,width,position,color,background-color] duration-700 ease-swoosh`}
            style={{
                height: isClient ? "56px" : "0px",
                width: scrolled ? "100%" : "1024px",
                position: scrolled ? "fixed" : "absolute",
                color: scrolled ? "white" : "black",
                backgroundColor: scrolled ? "black" : "white",
                top: scrolled ? "0" : "80px",
            }}
        >
            <menu className="flex gap-32 font-sans">
                <LinkC name="FIGHTS" link="fights" />
                <LinkC name="RANKINGS" link="rankings" />
                <LinkC name="BOXERS" link="boxers" />
                <LinkC name="ABOUT" link="about" />
            </menu>
        </nav>
    );
};

const LinkC = ({ name, link }: { name: string; link: string }) => {
    return <li className={`${rajdhani.className} font-semibold text-base`}>
        <Link href={`/${link}`}>{name}</Link>
    </li>
}