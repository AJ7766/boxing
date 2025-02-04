import { rajdhani } from "@/fonts/fonts";
import { DateTime } from "./DateTime";
import { Event } from "./Event";
import { Location } from "./Location";
import { Video } from "./Video";
import { getFight } from "@/server/actions/getFight";
import { FightersBg } from "./FightersBg";
import { Fight } from "./FIght";

const Videos = [{
    id: "lUAA0b-YjQM",
    alt: "Artur Beterbiev vs Dmitry Bivol Face Off",
    type: "The Face-off"
},
{
    id: "n4LJ-wmRbc8",
    alt: "Artur Beterbiev vs Dmitry Bivol Press Conference",
    type: "Press Conference"
},
{
    id: "nDyCgocB5aM",
    alt: "Artur Beterbiev vs Dmitry Bivol First fight",
    type: "First Fight"
}
]

export const News = async () => {
    const fetchedFight = await getFight('675269742d129078aff55563');
    return (
        <div className={`relative bg-gray-100 min-h-screen p-7 ${rajdhani.className} overflow-hidden`}>
            <FightersBg
                fighter1={fetchedFight.fighters.fighter_1.name || fetchedFight.fighters.fighter_1.full_name}
                fighter2={fetchedFight.fighters.fighter_2.name || fetchedFight.fighters.fighter_2.full_name}
            />
            <Event
                fighter1={fetchedFight.fighters.fighter_1}
                fighter2={fetchedFight.fighters.fighter_2}
            >
                <Fight
                    fighter1={fetchedFight.fighters.fighter_1.full_name || fetchedFight.fighters.fighter_1.name}
                    fighter2={fetchedFight.fighters.fighter_2.full_name || fetchedFight.fighters.fighter_2.name}
                />
                <Location
                    location={fetchedFight.location}
                />
                <DateTime
                    fightDate={new Date(fetchedFight.date)}
                />
                {/* Videos */}
                <div className="flex flex-row gap-1">
                    {Videos.map((video) => (
                        <Video
                            key={video.id}
                            id={video.id}
                            alt={video.alt}
                            type={video.type}
                        />
                    ))
                    }
                </div>
            </Event>
        </div >
    );
}