"use client"
import { localTimeFormat } from "@/utils/DateTimeFormatter";
import { useLayoutEffect, useState } from "react";

export const DateTime = ({ fightDate }: { fightDate: Date | null }) => {
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <p className="font-semibold">RING WALK: {isClient ? localTimeFormat(fightDate) : 'Loading...'}</p>
}