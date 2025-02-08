"use client"
import { DateTime } from "luxon";

export const FightDate = ({ date }: { date?: string | null }) => {
    if (date === null || date === undefined) return 'No time available';
    
    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return (
        <p className="text-center text-2xl font-semibold text-gray-600 leading-none">
            {localDateTime.toFormat('dd MMMM')}
            <br />
            <span className="text-lg">{localDateTime.toFormat('HH:mm')} - {`${timeZone}`}</span>
        </p>
    )
}