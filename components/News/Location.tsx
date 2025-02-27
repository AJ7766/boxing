"use client"
export const Location = ({ location }: { location?: string | null }) => {
    return <address className="font-semibold not-italic">{location}</address>
}