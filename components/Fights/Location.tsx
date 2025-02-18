
export const Location = ({ location }: { location: string | null }) => {
    return (
        <p className="font-medium text-gray-500">
            {(() => {
                // Splitting the Arena and Location
                const parts = location?.split(',') || [];
                // If there is no Arena assigned yet, just return the location
                if (parts.length === 2) {
                    return parts.slice(-2).join(', ') || 'No location available';
                }
                return (
                    <>
                        {parts[0]} <br /> {parts.slice(1).join(', ') || 'No location available'}
                    </>
                )
            })()}
        </p>
    )
}