"use client"
import { localTimeFormat } from "@/utils/DateTimeFormatter";
import { useLayoutEffect, useState } from "react";

export const NewsDate = ({ date }: { date?: string | null }) => {
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <p className="font-semibold">RING WALK: {isClient ? localTimeFormat(date) : 'Loading...'}</p>
}