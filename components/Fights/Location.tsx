export const Location = ({ location }: { location: string | null }) => {
    return (
        <div className="flex items-center gap-2 mt-3">
            {/* <Image src="/location.svg" width={16} height={16} alt="Location of the fight" /> */}
            <p className="text-sm font-semibold text-gray-600 leading-tight mb-1">
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
        </div>
    )
}