"use client";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import { Title } from "../Title";
import { useIsClient } from "@/hooks/useClient";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface DateProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Countdown = ({ date }: { date?: string | null }) => {
    const isClient = useIsClient();
    const [countdown, setCountdown] = useState<DateProps>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!date) return;
        const updateCountdown = () => {
            const now = DateTime.now();
            const fightTime = DateTime.fromISO(date);
            const diff = fightTime.diff(now, ["days", "hours", "minutes", "seconds"]).toObject(); // Calculate the difference

            setCountdown({
                days: diff.days ?? 0,
                hours: diff.hours ?? 0,
                minutes: diff.minutes ?? 0,
                seconds: Math.floor(diff.seconds || 0),
            });
        };
        // Initial update, then update every second
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [date]);

    if (!isClient) return null;

    return (
        <div className="p-4 flex flex-col font-bold text-center">
            <Title>EVENT STARTS IN</Title>
            <div className="flex flex-col align-center mx-auto">
                <div className="flex text-4xl space-x-1">
                    <Digit digit={countdown.days} />
                    <span>:</span>
                    <Digit digit={countdown.hours} />
                    <span>:</span>
                    <Digit digit={countdown.minutes} />
                    <span>:</span>
                    <Digit digit={countdown.seconds} />
                </div>
                <div className="flex text-lg mx-auto gap-2">
                    <span>DAYS</span>
                    <span>HOURS</span>
                    <span>MINS</span>
                    <span>SECS</span>
                </div>
            </div>
        </div >
    );
};

const Digit = ({ digit }: { digit: number }) => {
    const padded = String(digit).padStart(2, "0");
    return (
        <div className="flex justify-center items-center">
            {padded.split("").map((d, i) => (
                <AnimatedDigit key={i} digit={Number(d)} />
            ))}
        </div>
    );
}

const AnimatedDigit = ({ digit }: { digit: number }) => {
    const [prevDigit, setPrevDigit] = useState<string | null>(null);
    const [currentDigit, setCurrentDigit] = useState<string>(String(digit));

    // Refs for the outgoing (prev) and incoming (current) digits
    const prevRef = useRef<HTMLSpanElement>(null);
    const currentRef = useRef<HTMLSpanElement>(null);

    // When the digit prop changes, store the old digit and update the current one.
    useEffect(() => {
        const newDigit = String(digit);
        if (newDigit !== currentDigit) {
            setPrevDigit(currentDigit);
            setCurrentDigit(newDigit);
        }
    }, [digit, currentDigit]);

    // Animate the digit transition whenever prevDigit is set.
    useGSAP(() => {
        if (prevDigit && prevRef.current && currentRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setPrevDigit(null);
                },
            });
            // Animate the previous digit sliding down and fading out.
            tl.to(prevRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            });
            // Animate the new digit sliding in from above.
            tl.fromTo(
                currentRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            );
        }
    }, [prevDigit]);

    return (
        <div className="relative inline-block w-[18px] h-[2ch] overflow-hidden">
            {prevDigit && (
                <span ref={prevRef} className="absolute top-0 left-0 w-full">
                    {prevDigit}
                </span>
            )}
            <span
                ref={currentRef}
                className={`absolute top-0 left-0 w-full`}
            >
                {currentDigit}
            </span>
        </div>
    );
}