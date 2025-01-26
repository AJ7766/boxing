"use client"
import { DateTime } from "luxon";
import { useLayoutEffect, useState } from "react";

export const Time = () => {
    const [isClient, setIsClient] = useState(false);
    const date = new Date();
    useLayoutEffect(()=> {
        setIsClient(true);
    },[])

    if(!isClient) return;

    return <div>LOCAL TIME: {localTimeFormat(date)}</div>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
}