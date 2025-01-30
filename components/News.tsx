import Image from "next/image";
import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";

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
                    {event.videos && event.videos.map((video) => (
                        <Video key={video.id} id={video.id} alt={video.alt} type={video.type} />
                    ))}
                </Event>
            ))}
        </div>
    );
}

const Event = ({ title, children }: EventProps) => {
    const parts = title.split('vs');
    return (
        <div>
            <h1 className="text-4xl font-bold mb-2">
                {parts[0]} <span className="text-red-500">{`vs${parts[1]}`}</span>
            </h1>
            {children}
        </div>
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