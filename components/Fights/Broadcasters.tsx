import { BroadcastProps } from '@/types/fightsType'
import Image from 'next/image'
import React from 'react'

export const Broadcasters = ({ broadcasters }: { broadcasters?: BroadcastProps[] }) => {
    return (
        <>
            {(broadcasters && broadcasters.length > 1) &&
                <div className="mt-auto mb-1">
                    {broadcasters.map((broadcaster: BroadcastProps, i) => (
                        <div className="text-sm font-semibold flex items-center gap-2" key={i}>
                            {broadcaster.country.includes('United States') &&
                                <Image src="/us.svg" width={22} height={22} alt="USA broadcaster" />}
                            {broadcaster.country.includes('United Kingdom') &&
                                <Image src="/gb.svg" width={22} height={22} alt="United Kingdom broadcaster" />}
                            <p>{broadcaster.network}</p>
                        </div>
                    ))}
                </div>}
        </>
    )
}