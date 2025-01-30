import Image from "next/image";
import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";

interface EventProps {
    title: string;
    children: React.ReactNode;
}

interface VideoProps {
    id: string;
    type: string;
}

export const News = () => {
    return (
        <div className={`bg-gray-200 min-h-screen p-7 ${rajdhani.className}`}>
            <Event title="ARTUR BETERBIEV vs DMITRY BIVOL">
                <Video id="n4LJ-wmRbc8" type='Press Conference' />
            </Event>
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

const Video = ({ id, type }: VideoProps) => {
    return (
        <div className="relative">
            <div className="overflow-hidden max-w-md">
                <Link href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                        alt="YouTube Video Thumbnail"
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