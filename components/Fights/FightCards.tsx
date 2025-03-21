"use client"
import { FightDate } from "./FightDate";
import { useIsClient } from "@/hooks/useClient";
import { Location } from "./Location";
import { FightersTable } from "./FightersTable";
import { useFights } from "@/context/FightsContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Broadcasters } from "./Broadcasters";

gsap.registerPlugin(ScrollTrigger);

export const FightCards = () => {
    const isClient = useIsClient();
    const { data: { fights }, isLoading } = useFights();
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRefs.current || !isClient || isLoading) return;

        containerRefs.current.forEach((card) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 80 },
                {
                    opacity: 1, y: 0,
                    scrollTrigger: {
                        trigger: card,
                        start: "-80px bottom",
                        end: "top 85%",
                        scrub: true,
                    },
                }
            )
        });
    }, [isLoading, isClient]);

    // Skeleton
    if (isClient || isLoading) {
        return (
            <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </>
        )
    }

    if (fights?.length === 0) return <p className="text-center text-4xl font-medium">No fights found</p>

    return (
        // RENDER FIGHTS
        (fights?.map((fight, i) => (
            <div ref={el => { containerRefs.current[i] = el }} className={`w-full mx-auto grid grid-cols-[30%_50%_auto] self-start items-start text-base gap-2 border-b mb-10 pb-10`} key={i}>
                <div className="flex flex-col justify-between text-left">
                    {/* FIGHT DATE */}
                    <FightDate date={fight.date ? new window.Date(fight.date).toISOString() : null} />
                    {/* LOCATION */}
                    <Location location={fight.location} />
                </div>
                {/* FIGHTERS */}
                <FightersTable
                    fighter1={fight.fighter1?.name || fight.fighter1?.nickname || fight.title?.split('vs')[0]}
                    fighter2={fight.fighter2?.name || fight.fighter2?.nickname || fight.title?.split('vs')[1]}
                    stats1={`${fight.fighter1 ? `${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0} (${fight.fighter1?.ko_wins} KO)` : ''}`}
                    stats2={`${fight.fighter2 ? `${fight.fighter2?.wins}-${fight.fighter2?.losses || 0}-${fight.fighter2?.draws || 0} (${fight.fighter2?.ko_wins} KO)` : ''}`}
                />
                {/* BROADCASTERS */}
                <Broadcasters broadcasters={fight.broadcasters} />
            </div>
        ))))
}

const SkeletonCard = () => (
    <div className="w-full flex flex-col gap-4 pb-10 animate-pulse">
        <div className="w-full h-32 bg-gray-200 flex flex-col p-2 mx-auto rounded">
            <div className="flex">
                <div className="flex flex-col gap-2 w-1/3">
                    <span className="w-24 h-6 bg-gray-400 rounded" />
                    <span className="w-36 h-5 bg-gray-400 rounded" />
                </div>
                <span className="w-64 h-6 bg-gray-400 self-center rounded" />
            </div>
            <div className="flex justify-between mt-auto">
                <span className="w-20 h-6 bg-gray-400 rounded" />
                <span className="w-20 h-6 bg-gray-400 rounded" />
            </div>
        </div>
    </div>
)