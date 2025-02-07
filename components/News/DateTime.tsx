"use client"
import { DateTime as LuxonDateTime } from "luxon";
import { useLayoutEffect, useState } from "react";

export const DateTime = ({ fightDate }: { fightDate: Date | null }) => {
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <p className="font-semibold">RING WALK: {isClient ? (fightDate instanceof Date ? localTimeFormat(fightDate) : 'No time available') : 'Loading...'}</p>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = LuxonDateTime.fromJSDate(date).setZone('local');
    const timeZone = localDateTime.zoneName;
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy') + ' - ' + timeZone;
}