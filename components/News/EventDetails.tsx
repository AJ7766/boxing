"use client"
import React from 'react'
import { useIsClient } from "@/hooks/useClient";
import { DateTime } from 'luxon';

interface EventDetailsProps {
    fighter1?: string | null;
    fighter2?: string | null;
    eventDate?: string | null;
    location?: string | null;
    date?: string | null
}
export const EventDetails = ({ fighter1, fighter2, eventDate, location, date }: EventDetailsProps) => {
    return <div className='font-bold'>
        {/*Fighter1 vs Fighter2*/}
        <p className="font-bold">{fighter1} vs {fighter2}</p>
        {/*Fight Location*/}
        <address className="not-italic">Location: <span className='font-medium'>{location}</span></address>
        {/*Event Date*/}
        <time className="">Event time: <span className='font-medium'>{localTimeFormat(eventDate)}</span></time>
        <br />
        {/*Fight Date*/}
        <time className="">Ring walk time: <span className='font-medium'>{localTimeFormat(date)}</span></time>
    </div>
}

const localTimeFormat = (date?: string | null) => {
    const isClient = useIsClient();

    if (date === null || date === undefined) return 'No time available';

    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return isClient ? `${localDateTime.toFormat('ccc')}, ${localDateTime.toFormat('dd MMMM - (HH:mm')} ${timeZone})`
        : 'Loading...'
}