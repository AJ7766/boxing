"use client"
import React from 'react'
import { useIsClient } from "@/hooks/useClient";
import { DateTime } from 'luxon';
import { BroadcastProps } from '@/types/fightsType';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Countdown = dynamic(() =>
    import('@/components/News/Countdown').then((mod) => mod.Countdown)
)

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

    return (
        <div className='font-bold text-xl'>
            {/* Countdown */}
            <Countdown date={date} />
            {/* Fighter1 vs Fighter2 */}
            <span className="font-bold">{fighter1} vs {fighter2}</span>
            {/* Fight Location */}
            <address className="not-italic">Location:&nbsp;
                <span className='font-medium'>{location}</span>
            </address>
            {/* Event Date */}
            <time>Event time:&nbsp;
                <span className='font-medium'>{isClient ? localTimeFormat(eventDate) : 'Loading...'}</span>
            </time>
            <br />
            {/* Fight Date */}
            <time className="">Ring walk time:&nbsp;
                <span className='font-medium'>{date ? isClient ? localTimeFormat(date) : 'Loading...' : 'No time available'}</span>
            </time>
            {/* Broadcasters */}
            {(broadcasters && broadcasters.length > 1) &&
                <div className="flex mt-auto mb-1 gap-2">
                    <span>Stream at:</span>
                    {broadcasters.map((broadcaster: BroadcastProps, i) => (
                        <div className="text-sm font-semibold flex items-center gap-1" key={i}>
                            {broadcaster.country.includes('United States') &&
                                <Image src="/us.svg" width={25} height={25} alt="USA broadcaster" />}
                            {broadcaster.country.includes('United Kingdom') &&
                                <Image src="/gb.svg" width={25} height={25} alt="United Kingdom broadcaster" />}
                            <span className='text-lg'>{broadcaster.network}</span>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

const localTimeFormat = (date?: string | null) => {
    if (date === null || date === undefined) return 'No time available';
    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return `${localDateTime.toFormat('ccc')}, ${localDateTime.toFormat('dd MMMM - (HH:mm')} ${timeZone})`
}