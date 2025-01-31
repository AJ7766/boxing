import { rajdhani } from "@/fonts/fonts";
import { Time } from "./Time";
import { Event } from "./Event";
import { Location } from "./Location";
import { Video } from "./Video";

const Events = [{
    title: "ARTUR BETERBIEV vs DMITRY BIVOL",
    type: "Press Conference",
    id: "n4LJ-wmRbc8",
    videos: [{
        id: "n4LJ-wmRbc8",
        alt: "Artur Beterbiev vs Dmitry Bivol Press Conference",
        type: "Press Conference"
    }]
}]

export const News = () => {
    return (
        <div className={`bg-gray-100 min-h-screen p-7 ${rajdhani.className}`}>
            {Events.map((event, i) => (
                <Event key={i} title={event.title}>
                    <Location location='KINGDOM ARENA, RIYADH, SA' />
                    <Time year={2025} month={2} day={22} hour={23} />
                    {event.videos && event.videos.map((video) => (
                        <Video key={video.id} id={video.id} alt={video.alt} type={video.type} />
                    ))}
                </Event>
            ))
            }
        </div >
    );
}