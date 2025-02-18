"use client"
import { useIsClient } from "@/hooks/useClient";
import { DateTime } from "luxon";

export const FightDate = ({ date }: { date?: string | null }) => {
    const isClient = useIsClient();
    if (date === null || date === undefined) return 'No time available';

    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return (
        <p className="text-xl font-bold border-b pb-2">
            {localDateTime.toFormat('dd MMMM')}
            <br />
            <span className="text-base font-medium">{isClient ? `${localDateTime.toFormat('HH:mm')} ${timeZone}` : 'Loading...'}</span>
        </p>
    )
}