"use client"
import { useIsClient } from "@/hooks/useClient";
import { DateTime } from "luxon";

export const FightDate = ({ date }: { date?: string | null }) => {
    const isClient = useIsClient();
    if (date === null || date === undefined) return 'No time available';

    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return (
        <>
            <p className="text-2xl font-bold leading-none">{localDateTime.toFormat('ccc')}, {localDateTime.toFormat('MMM dd')}</p>
            <div className="h-6 flex items-center gap-2 text-base font-semibold">
                {/* <Image src="/time.svg" width={16} height={16} alt="Estimated local time start" /> */}
                <p>
                    {isClient ? `${localDateTime.toFormat('HH:mm')} ${timeZone}` : 'Loading...'}
                </p>
            </div>
        </>
    )
}