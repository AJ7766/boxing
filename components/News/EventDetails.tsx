"use client"
import React from 'react'
import { useIsClient } from "@/hooks/useClient";
import { DateTime } from 'luxon';
import { BroadcastProps } from '@/types/fightsType';
import Image from 'next/image';
import { Countdown } from './Countdown';

interface EventDetailsProps {
    fighter1?: string | null;
    fighter2?: string | null;
    eventDate?: string | null;
    location?: string | null;
    date?: string | null
    broadcasters?: BroadcastProps[]
}
export const EventDetails = ({ fighter1, fighter2, eventDate, location, date, broadcasters }: EventDetailsProps) => {
    const isClient = useIsClient();

    return <div className='font-bold text-xl'>
        <Countdown date={date} />
        {/* Fighter1 vs Fighter2 */}
        <div /> <time />
        <p className="font-bold">{fighter1} vs {fighter2}</p>
        {/* Fight Location */}
        <address className="not-italic">Location: <span className='font-medium'>{location}</span></address>
        {/* Event Date */}
        <time className="">Event time: <span className='font-medium'>{isClient ? localTimeFormat(eventDate) : 'Loading...'}</span></time>
        <br />
        {/* Fight Date */}
        <time className="">Ring walk time: <span className='font-medium'>{date ? isClient ? localTimeFormat(date) : 'Loading...' : 'No time available'}</span></time>
        {/* Broadcasters */}
        {(broadcasters && broadcasters.length > 1) &&
            <div className="flex mt-auto mb-1 gap-2">
                <span>Stream at:</span>
                {broadcasters.map((broadcaster: BroadcastProps, i) => (
                    <div className="text-sm font-semibold flex items-center gap-1" key={i}>
                        {broadcaster.country.includes('United States') &&
                            <Image src="/us.svg" width={22} height={22} alt="USA broadcaster" />}
                        {broadcaster.country.includes('United Kingdom') &&
                            <Image src="/gb.svg" width={22} height={22} alt="United Kingdom broadcaster" />}
                        <p>{broadcaster.network}</p>
                    </div>
                ))}
            </div>}
    </div>
}

const localTimeFormat = (date?: string | null) => {
    if (date === null || date === undefined) return 'No time available';
    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return `${localDateTime.toFormat('ccc')}, ${localDateTime.toFormat('dd MMMM - (HH:mm')} ${timeZone})`
}