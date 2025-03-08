"use client";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";
import { Title } from "../Title";

export const Countdown = ({ date }: { date?: string | null }) => {
    const [countdown, setCountdown] = useState<string>("00:00:00:00");

    const updateCountdown = useCallback(() => {
        if (!date) return;
        // Calculate the remaining time to the fight
        // Converting to an object with days, hours, minutes and seconds
        const now = DateTime.now();
        const fightTime = DateTime.fromISO(date);
        const diff = fightTime.diff(now, ["days", "hours", "minutes", "seconds"]).toObject();
        if (!diff.seconds || diff.seconds < 0)
            return setCountdown("00:00:00:00")
        // Joining the object to display in "00:00:00:00" format
        setCountdown([
            formatNumber(diff.days),
            formatNumber(diff.hours),
            formatNumber(diff.minutes),
            formatNumber(Math.floor(diff.seconds ?? 0))
        ].join(":"));
    }, [date]);

    // Updating the countdown every second
    useEffect(() => {
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [updateCountdown]);

    return (
        <div className="p-4 flex flex-col gap-1 font-bold text-center">
            <Title>EVENT STARTS IN</Title>
            <div className="flex text-center mx-auto">
                {/* Splitting the countdown "00:00:00:00" => [00", "00", "00", "00] */}
                {countdown && countdown.split(":").map((part, index) => (
                    <React.Fragment key={index}>
                        <div key={index} className="flex flex-col items-center">
                            <div className="flex gap-[2px]">
                                {/* Splitting each part of the countdown "00" => [0, 0], rendering two <span>*/}
                                {part.split("").map((char, charIndex) => (
                                    <span
                                        className='relative text-3xl w-6'
                                        key={charIndex}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                            {/* Rendering the unit of the countdown */}
                            <span className="text-xl">{["DAYS", "HOURS", "MINS", "SECS"][index]}</span>
                        </div>
                        {/* Rendering the ":" between each part of the countdown */}
                        {index < countdown.split(":").length - 1 && (
                            <span className="relative text-3xl mx-1 text-red-500">:</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Format a number with leading zeros, for example: 1 -> "01"
const formatNumber = (num: number | undefined) => {
    return num !== undefined ? num.toString().padStart(2, "0") : "00";
}