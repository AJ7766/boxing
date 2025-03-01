"use client"
import React from 'react'
import { useIsClient } from "@/hooks/useClient";
import { localTimeFormat } from "@/utils/DateTimeFormatter";

interface EventDetailsProps {
    fighter1?: string | null;
    fighter2?: string | null;
    eventDate?: string | null;
    location?: string | null;
    date?: string | null
}
export const EventDetails = ({ fighter1, fighter2, eventDate, location, date }: EventDetailsProps) => {
    const isClient = useIsClient();

    return <div className='font-bold'>
        {/*Fighter1 vs Fighter2*/}
        <div /> <time />
        <p className="font-bold">{fighter1} vs {fighter2}</p>
        {/*Fight Location*/}
        <address className="not-italic">Location: <span className='font-medium'>{location}</span></address>
        {/*Event Date*/}
        <time className="">Event time: <span className='font-medium'>{date ? isClient ? localTimeFormat(eventDate) : 'Loading...' : 'No time available'}</span></time>
        <br />
        {/*Fight Date*/}
        <time className="">Ring walk time: <span className='font-medium'>{date ? isClient ? localTimeFormat(date) : 'Loading...' : 'No time available'}</span></time>
    </div>
}