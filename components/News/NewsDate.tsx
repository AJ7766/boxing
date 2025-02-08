"use client"
import { useIsClient } from "@/hooks/useClient";
import { localTimeFormat } from "@/utils/DateTimeFormatter";

export const NewsDate = ({ date }: { date?: string | null }) => {
    const isClient = useIsClient();

    return <p className="font-semibold">RING WALK: {isClient ? localTimeFormat(date) : 'Loading...'}</p>
}