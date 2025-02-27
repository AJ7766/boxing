"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinkC } from "./Link";
import { useIsClient } from "@/hooks/useClient";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Nav = () => {
    const isClient = useIsClient();
    const [isScrolled, setIsScrolled] = useState(false);

    const links = ["news", "fights", "rankings", "boxers", "about"];
    const [underlineState, setUnderlineState] = useState<{
        linkIndex: number;
        width: number;
        left: number
    }>({
        linkIndex: 0, width: 0, left: 0
    });

    // Refs to Link and Menu, holding their position and width
    const navRef = useRef<HTMLElement | null>(null);
    const menuRef = useRef<{ el: HTMLMenuElement | null; left: number }>({ el: null, left: 0 });
    const linkRefs = useRef<{ el: HTMLAnchorElement | null; width: number; left: number }[]>([]);
    const pathname = usePathname();

    const [windowWidth, setWindowWidth] = useState(() => {
        return isClient ? window.innerWidth : 0;
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Get the position and width of the menu when window is resized
    useEffect(() => {
        if (menuRef.current.el) {
            const rect = menuRef.current.el.getBoundingClientRect();
            menuRef.current.left = rect.left;
        }
        linkRefs.current = links.map((_, index) => {
            const el = linkRefs.current[index]?.el;
            if (!el) return { el: null, width: 0, left: 0 };
            const rect = el.getBoundingClientRect();
            return { el, width: rect.width, left: rect.left };
        });
    }, [windowWidth]);

    // Checking for the active link
    useEffect(() => {
        const index = links.findIndex(name => pathname === `/${name}`);
        const activeIndex = index !== -1 ? index : links.indexOf("news"); // If not found, default to "news"
        // Update activeLinkIndex and underlineState
        setUnderlineState((prev) => ({
            ...prev,
            linkIndex: activeIndex
        }));
        updateUnderlinePosition(activeIndex);
    }, [pathname]);

    const updateUnderlinePosition = useCallback((index: number) => {
        const link = linkRefs.current[index];
        if (link && menuRef.current) {
            setUnderlineState((prev) => {
                const newWidth = link.width;
                const newLeft = link.left - menuRef.current.left + link.width / 2;
                // Only update if values have changed
                if (prev.width === newWidth && prev.left === newLeft)
                    return prev;

                return { ...prev, width: newWidth, left: newLeft };
            });
        }
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLMenuElement>) => {
        const mouseX = e.clientX; // Get the mouse position on the x-axis
        let closestLinkIndex = -1; // Initialize with -1 (no link)
        let closestDistance = Infinity; // Initialize with a large value

        linkRefs.current.forEach((link, index) => {
            const linkCenterX = link.left + link.width / 2;
            const distance = Math.abs(mouseX - linkCenterX); // Calculate the distance between the mouse and the link
            // Update the closest link if the distance is smaller
            // First iteration will always be true, since distance will always be smaller than Infinity
            if (distance < closestDistance) {
                closestDistance = distance;
                closestLinkIndex = index;
            }
        });
        // If link was found, update the underline position
        if (closestLinkIndex !== -1) {
            updateUnderlinePosition(closestLinkIndex);
        }
    }, [updateUnderlinePosition]); // Add updateUnderlinePosition as a dependency, to get the correct underline position

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 80);
    }, []);

    useEffect(() => {
        handleScroll() // Initial call
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useGSAP(() => {

    }, [])
    return (
        <nav
            ref={navRef}
            className={`bg-white h-14 items-center justify-center -translate-x-1/2 left-1/2 hidden lg:flex
                ${isScrolled
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
            }}>
            <menu
                // Reference to element if it doesn't already exist
                ref={(el: HTMLMenuElement | null) => {
                    if (el && !menuRef.current.el)
                        (menuRef.current = { el, left: 0 })
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => updateUnderlinePosition(underlineState.linkIndex)}
                className="relative flex gap-32 font-sans">
                {/* Links */}
                {links.map((name, index) => (
                    <LinkC
                        className={`${isClient ? 'opacity-100' : 'opacity-0'}`}
                        key={name}
                        name={name}
                        ref={(el: HTMLAnchorElement | null) => {
                            if (el && !linkRefs.current[index])
                                linkRefs.current[index] = { el, width: 0, left: 0 }
                        }}
                    />))}
                {/* Underline */}
                {isClient && <div
                    className="absolute bottom-0 h-[2px] bg-red-600"
                    style={{
                        width: `${underlineState.width}px`,
                        left: `${underlineState.left - underlineState.width / 2}px`,
                        transition:
                            "width 0.45s cubic-bezier(0.46,0.03,0.65,1), left 0.45s cubic-bezier(0.46,0.03,0.65,1)",
                    }}
                />}
            </menu>
        </nav >
    );
};
