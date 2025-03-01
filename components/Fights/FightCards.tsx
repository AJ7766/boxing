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
        if (!containerRefs.current || !isClient) return;

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
    }, [fights]);

    if (!isClient || isLoading) return <p className="text-center text-4xl font-medium">Loading...</p>;

    if (fights?.length === 0) return <p className="text-center text-4xl font-medium">No fights found</p>

    return (
        // RENDER FIGHTS
        (fights?.map((fight, i) => (
            <div ref={el => { containerRefs.current[i] = el }} className={`max-w-[900px] w-full mx-auto grid grid-cols-[30%_50%_auto] self-start items-start text-base gap-2 border-b mb-2`} key={i}>
                <div className="flex flex-col justify-between text-left">
                    {/* FIGHT DATE */}
                    <FightDate date={fight.date ? new window.Date(fight.date).toISOString() : null} />
                    {/* LOCATION */}
                    <Location location={fight.location} />
                </div>
                {/* FIGHTERS */}
                <FightersTable
                    fighter1={fight.fighter1?.name || fight.fighter1?.nickname}
                    fighter2={fight.fighter2?.name || fight.fighter2?.nickname || fight.title?.split('vs')[1]}
                    stats1={`${fight.fighter1 ? `${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0} (${fight.fighter1?.ko_wins} KO)` : ''}`}
                    stats2={`${fight.fighter2 ? `${fight.fighter2?.wins}-${fight.fighter2?.losses || 0}-${fight.fighter2?.draws || 0} (${fight.fighter2?.ko_wins} KO)` : ''}`}
                />
                {/* BROADCASTERS */}
                <Broadcasters broadcasters={fight.broadcasters} />
            </div>
        ))))
}