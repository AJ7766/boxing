"use client"
import { DateTime } from "luxon";

export const Time = () => {
    const date = new Date();

    return <div>LOCAL TIME: {localTimeFormat(date)}</div>
}

const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
}