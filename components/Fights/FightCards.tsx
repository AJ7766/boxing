"use client"
import { useEffect, useState } from "react"
import { FighterName } from "./FighterName";
import { FighterStats } from "./FighterStats";
import { Date } from "./Date";
import { getFights } from "@/services/fightsServices";
import { useIsClient } from "@/hooks/useClient";
import { useFights } from "@/context/fightsContext";

export const FightCards = ({ start, end }: { start: number, end: number }) => {
    const { fights, setFights } = useFights();

    const [isLoading, setIsLoading] = useState(true);
    const isClient = useIsClient();

    useEffect(() => {
        const fetchFights = async () => {
            const { fetchedFights, totalFights } = await getFights(start, end);
            setFights({
                fights: JSON.parse(JSON.stringify(fetchedFights)),
                totalFights: totalFights,
            });
            setIsLoading(false);
        }
        fetchFights();
    }, [end, start, setFights])

    if (!isClient || isLoading) return <p className="text-center text-4xl font-medium">Loading...</p>;

    return (
        (fights.fights.length <= 0 ? <p className="text-center text-4xl font-medium">No fights found</p>
            : // Fights
            (fights.fights.map((fight, i) => (
                <div className={`max-w-[850px] w-full mx-auto flex flex-col items-center gap-2`} key={i}>
                    {/* TITLE */}
                    <div className="w-full grid grid-cols-[20%_60%_20%] items-center">
                        {/* FIGHTER 1 */}
                        <div>
                            <FighterName name={fight.fighter1?.name || fight.fighter1?.nickname} />
                            <FighterStats stats={`${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0}`} />
                        </div>
                        <div className="flex flex-col justify-between text-center">
                            <Date date={fight.date ? new window.Date(fight.date).toISOString() : null} />
                            {/* LOCATION */}
                            <p className="text-lg font-medium text-gray-500 border-b mb-2">{fight.location}</p>
                            {/* ROUNDS @ DIVISION */}
                            <p className="text-red-700 text-lg font-semibold">{fight.scheduledRounds} ROUNDS @ {fight.division}</p>
                            {/* BELTS IN PLAY */}
                            {fight.titles.map((title) => (
                                <p className="text-[#804A00] text-base font-medium" key={title.id}>{title.name}</p>
                            ))}
                        </div>
                        {/* FIGHTER 2 */}
                        <div className="text-right">
                            <FighterName name={fight.fighter2?.name || fight.fighter2?.nickname} />
                            <FighterStats stats={`${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0}`} />
                        </div>
                    </div>
                </div>
            )))))
}