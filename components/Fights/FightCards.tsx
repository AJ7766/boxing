"use client"
import { FighterName } from "./FighterName";
import { FighterStats } from "./FighterStats";
import { FightDate } from "./FightDate";
import { useFights } from "@/context/FightsContext";
import { useIsClient } from "@/hooks/useClient";
import { BroadcastProps } from "@/types/fightsType";
import { Location } from "./Location";
import { FightersTable } from "./FightersTable";

export const FightCards = () => {
    const isClient = useIsClient();
    const { data: { fights }, isLoading } = useFights();

    if (!isClient || isLoading) return <p className="text-center text-4xl font-medium">Loading...</p>;

    if (fights?.length === 0) return <p className="text-center text-4xl font-medium">No fights found</p>


    return (
        // RENDER FIGHTS
        (fights?.map((fight, i) => (
            <div className={`max-w-[900px] w-full mx-auto flex flex-col text-base gap-2 border-b mb-2`} key={i}>
                <div className="w-full grid grid-cols-[30%_auto_35%] self-start items-start">
                    <div className="flex flex-col justify-between text-left">
                        <FightDate date={fight.date ? new window.Date(fight.date).toISOString() : null} />
                        {/* LOCATION */}
                        <p className="font-semibold">Location</p>
                        <Location location={fight.location} />
                        {/* BROADCASTERS */}
                        <p className="font-semibold">Broadcasters</p>
                        {fight.broadcasters?.map((broadcaster: BroadcastProps, i) => (
                            <div key={i}>
                                <p>{broadcaster.country} {broadcaster.network}</p>
                            </div>

                        ))}
                    </div>
                    <div>
                        {/* ROUNDS @ DIVISION */}
                        <p className="text-red-700 font-semibold">{fight.scheduledRounds} ROUNDS @ {fight.division}</p>
                        {/* BELTS IN PLAY */}
                        {fight.titles.map((title) => (
                            <p className="text-[#804A00] font-medium" key={title.id}>{title.name}</p>
                        ))}
                    </div>
                    {/* FIGHTERS */}
                    <FightersTable
                        fighter1={fight.fighter1?.name || fight.fighter1?.nickname}
                        fighter2={fight.fighter2?.name || fight.fighter2?.nickname}
                        stats1={`${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0}`}
                        stats2={`${fight.fighter2?.wins}-${fight.fighter2?.losses || 0}-${fight.fighter2?.draws || 0}`}
                    />
                </div>
            </div>
        ))))
}