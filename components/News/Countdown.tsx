"use client";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

const formatNumber = (num: number | undefined) =>
    num !== undefined ? num.toString().padStart(2, "0") : "00";

export const Countdown = ({ date }: { date?: string | null }) => {
    const [countdown, setCountdown] = useState<string>("00:00:00:00");

    useEffect(() => {
        if (!date) return;

        const updateCountdown = () => {
            const now = DateTime.now();
            const eventTime = DateTime.fromISO(date);
            const diff = eventTime.diff(now, ["days", "hours", "minutes", "seconds"]).toObject();

            if (diff.seconds !== undefined && diff.seconds < 0) {
                setCountdown("00:00:00:00");
                return;
            }

            const segments = [
                formatNumber(diff.days),
                formatNumber(diff.hours),
                formatNumber(diff.minutes),
                formatNumber(Math.floor(diff.seconds ?? 0))
            ];

            setCountdown(segments.join(":"));
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [date]);

    return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white flex flex-col gap-1 text-center font-semibold text-xl">
            <p className="text-black text-2xl font-bold text-center">RINGWALK STARTS IN</p>
            <div className="flex">
                {countdown && countdown.split(":").map((part, index) => (
                    <React.Fragment key={index}>
                        <div key={index} className="flex flex-col items-center">
                            <div className="flex gap-[2px]">
                                {part.split("").map((char, charIndex) => (
                                    <span
                                        className={`relative font-bold ${char !== ':' && 'bg-gray-300 w-6'}`}
                                        key={charIndex}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                            <p>{["DAYS", "HOURS", "MINS", "SECS"][index]}</p>
                        </div>
                        {index < countdown.split(":").length - 1 && (
                            <span className="relative font-bold mx-1">:</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
