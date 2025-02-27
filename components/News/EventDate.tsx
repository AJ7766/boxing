"use client"
import { useIsClient } from "@/hooks/useClient";
import { localTimeFormat } from "@/utils/DateTimeFormatter";

export const EventDate = ({ date }: { date?: string | null }) => {
    const isClient = useIsClient();

    if (date === null || date === undefined) return 'No time available';

    return <time className="font-semibold">RING WALK: {isClient ? localTimeFormat(date) : 'Loading...'}</time>
}