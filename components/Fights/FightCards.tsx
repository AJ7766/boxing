"use client"
import { FightDate } from "./FightDate";
import { useIsClient } from "@/hooks/useClient";
import { BroadcastProps } from "@/types/fightsType";
import { Location } from "./Location";
import { FightersTable } from "./FightersTable";
import Image from "next/image";
import { useFights } from "@/context/FightsContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FightCards = () => {
    const isClient = useIsClient();
    const { data: { fights }, isLoading } = useFights();
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]); // Store multiple refs

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
            <div ref={el => { containerRefs.current[i] = el }} className={`max-w-[900px] w-full mx-auto flex flex-col text-base gap-2 border-b mb-2`} key={i}>
                <div className="w-full grid grid-cols-[30%_50%_auto] self-start items-start">
                    <div className="flex flex-col justify-between text-left">
                        {/* FIGHT DATE */}
                        <FightDate date={fight.date ? new window.Date(fight.date).toISOString() : null} />
                        <div className="flex gap-6">
                            {/* LOCATION */}
                            <Location location={fight.location} />
                            {/* ROUNDS @ DIVISION */}
                            {/* <p className="font-semibold">{fight.scheduledRounds} ROUNDS @ {fight.division}</p> */}
                            {/* BELTS IN PLAY */}
                            {/* {fight.titles.map((title) => (
                                <p className="text-[#804A00] font-medium" key={title.id}>{title.name}</p>
                            ))} */}
                        </div>
                    </div>
                    <div className="h-full flex flex-col justify-between items-start">
                        {/* FIGHTERS */}
                        <FightersTable
                            fighter1={fight.fighter1?.name || fight.fighter1?.nickname}
                            fighter2={fight.fighter2?.name || fight.fighter2?.nickname || fight.title?.split('vs')[1]}
                            stats1={`${fight.fighter1 ? `${fight.fighter1?.wins}-${fight.fighter1?.losses || 0}-${fight.fighter1?.draws || 0} (${fight.fighter1?.ko_wins} KO)` : ''}`}
                            stats2={`${fight.fighter2 ? `${fight.fighter2?.wins}-${fight.fighter2?.losses || 0}-${fight.fighter2?.draws || 0} (${fight.fighter2?.ko_wins} KO)` : ''}`}
                        />
                    </div>
                    {/* BROADCASTERS */}
                    {(fight.broadcasters && fight.broadcasters.length > 1) &&
                        <div className="mt-auto mb-1">
                            {fight.broadcasters.map((broadcaster: BroadcastProps, i) => (
                                <div className="text-sm font-semibold flex items-center gap-2" key={i}>
                                    {broadcaster.country.includes('United States') &&
                                        <Image src="/us.svg" width={22} height={22} alt="USA broadcaster" />}
                                    {broadcaster.country.includes('United Kingdom') &&
                                        <Image src="/gb.svg" width={22} height={22} alt="United Kingdom broadcaster" />}
                                    <p>{broadcaster.network}</p>
                                </div>
                            ))}
                        </div>}
                </div>
            </div>
        ))))
}