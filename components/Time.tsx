"use client"
import { DateTime } from "luxon";
import { useLayoutEffect, useState } from "react";

export const Time = () => {
    const [isClient, setIsClient] = useState(false);
    const date = new Date();

    useLayoutEffect(() => {
        setIsClient(true);
    }, [])

    return <div>LOCAL TIME: {isClient ? localTimeFormat2(date) : 'Loading...'}</div>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
}

const localTimeFormat2 = (date: Date) => {
    const localDateTime = date.toLocaleString('default', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const [hours, minutes] = localDateTime.split(' ')[1].split(':');
    const [year, month, day] = localDateTime.split(' ')[0].split('-');

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
}