"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinkC } from "./Link";
import { useIsClient } from "@/hooks/useClient";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { rajdhani } from "@/fonts/fonts";

export const Nav = () => {
    const isClient = useIsClient();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [windowWidth, setWindowWidth] = useState(() => isClient ? window.innerWidth : 0)
    const [underlineState, setUnderlineState] = useState<{
        linkIndex: number;
        width: number;
        left: number
    }>({
        linkIndex: 0, width: 0, left: 0
    });
    const links = ["news", "fights", "rankings", "boxers", "about"];
    // Refs to Link and Menu, holding their position and width
    const navRef = useRef<HTMLElement | null>(null);
    const menuRef = useRef<{ el: HTMLMenuElement | null; left: number }>({ el: null, left: 0 });
    const linkRefs = useRef<{ el: HTMLAnchorElement | null; width: number; left: number }[]>([]);

    // GSAP animations
    useGSAP(() => {
        if (!navRef.current || !isClient) return;

        if (!isScrolled) {
            // Set initial position of the nav, when not scrolled
            gsap.set(navRef.current, { position: "absolute", top: "50px" });
            // Animate the height on initial render if not scrolled
            if (!hasAnimated) {
                gsap.fromTo(
                    navRef.current,
                    { height: "0px" },
                    { height: "63px", ease: "sine.in", duration: 0.6 }
                );
                setHasAnimated(true);
            }
            // Animate the nav when scrolled back to the top
            gsap.to(
                navRef.current,
                { width: "1024px", color: "black", backgroundColor: "white", ease: "circ.out", duration: 0.6 });
        } else {
            // Set the position of the nav when scrolled
            gsap.set(navRef.current, { position: "fixed", top: "0px" });
            // When scrolled, update the nav immediately to the new styles.
            gsap.to(navRef.current, { width: "100vw", height: "63px", color: "white", backgroundColor: "black", duration: 0.6, ease: "circ.out" });
            setHasAnimated(true);
        }
    }, [isClient, isScrolled])

    // Assigning event listeners
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        const handleResize = () => setWindowWidth(window.innerWidth)
        // Initial call
        handleScroll()
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth, isClient]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

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

    return (
        <nav
            ref={navRef}
            className={`${isScrolled ? "w-screen h-[63px]" : "w-[1024px] h-0"} items-center justify-center -translate-x-1/2 left-1/2 hidden lg:flex z-30 drop-shadow-[0px_4px_9px_#00000026]`}>
            <menu
                // Reference to element if it doesn't already exist
                ref={(el: HTMLMenuElement | null) => {
                    if (el && !menuRef.current.el)
                        (menuRef.current = { el, left: 0 })
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => updateUnderlinePosition(underlineState.linkIndex)}
                className={`${rajdhani.className} relative flex gap-32 font-semibold text-base 
                ${isClient ? 'opacity-100' : 'opacity-0'} ease-in duration-300`}>
                {/* Links */}
                {links.map((name, index) => (
                    <LinkC
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
