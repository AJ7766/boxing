"use client"
import { DateTime } from "luxon";
import { useLayoutEffect, useState } from "react";

export const Time = () => {
    const [isClient, setIsClient] = useState(false);
    const date = new Date();

    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <div>LOCAL TIME: {isClient ? localTimeFormat(date) : 'Loading...'}</div>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    const timeZone = localDateTime.zoneName;
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy') + ' - ' + timeZone;
}