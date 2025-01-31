import Image from "next/image";
import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";
import { Time } from "./Time";

interface EventProps {
    title: string;
    children: React.ReactNode;
}

interface VideoProps {
    id: string;
    alt: string;
    type: string;
}
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

const Event = ({ title, children }: EventProps) => {
    const parts = title.split('vs');
    return (
        <div>
            <h1 className="text-9xl font-semibold -mb-20">{parts[0]}</h1>
            <h1 className="text-9xl font-medium italic text-red-500 pl-3">vs</h1>
            <h1 className="text-9xl font-semibold -mt-14">{parts[1]}</h1>
            {children}
        </div>
    )
}

const Location = ({ location }: { location: string }) => {
    return (
        <p className="font-semibold">{location}</p>
    )
}

const Video = ({ id, alt, type }: VideoProps) => {
    return (
        <div className="relative">
            <div className="overflow-hidden max-w-md">
                <Link href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                        alt={`${alt} Thumbnail`}
                        width={1280}
                        height={720}
                        loading='lazy'
                        className="w-auto transform transition-transform duration-300 ease-swoosh hover:scale-105"
                    />
                </Link>
            </div>
            <p className="absolute top-2 left-2 text-white text-xl font-semibold text-shadow">{type}</p>
        </div>
    )
}