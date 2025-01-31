"use client"
import { DateTime } from "luxon";
import { useLayoutEffect, useState } from "react";

interface DateProps {
    year: number;
    month: number;
    day: number;
    hour: number;
}

export const Time = (fightDate: DateProps) => {
    const [isClient, setIsClient] = useState(false);
    const date = new Date(Date.UTC(fightDate.year, fightDate.month - 1, fightDate.day, fightDate.hour, 0, 0));
    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <p className="font-semibold">RING WALK: {isClient ? localTimeFormat(date) : 'Loading...'}</p>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    const timeZone = localDateTime.zoneName;
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy') + ' - ' + timeZone;
}