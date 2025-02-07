"use client"
export const Location = ({ location }: { location?: string | null }) => {
    return (
        <p className="font-semibold">{location}</p>
    )
}