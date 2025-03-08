export const Location = ({ location }: { location: string | null }) => {
    // Splitting the Arena and Location
    const parts = location?.split(',') || [];

    if (parts.length === 2)
        return parts.slice(-2).join(', ') || 'No location available';

    return (
        <div className="flex items-center gap-2 mt-3">
            <address className="text-sm font-semibold text-gray-600 leading-tight mb-1 not-italic">
                {parts[0]} <br /> {parts.slice(1).join(', ') || 'No location available'}
            </address>
        </div>
    )
}