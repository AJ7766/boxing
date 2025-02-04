"use client"
import { useIsClient } from "@/hooks/useClient";
import Image from "next/image";
import Link from "next/link";

interface VideoProps {
    id: string;
    alt: string;
    type: string;
}

export const Video = ({ id, alt, type }: VideoProps) => {
    const isClient = useIsClient();

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
            {isClient && <p className="absolute top-2 left-2 text-white text-xl font-semibold text-shadow">{type}</p>}
        </div>
    )
}

/* const SkeletonLoader = () => (
    <div className="animate-pulse h-96 flex flex-col gap-2">
        <div className="bg-gray-300 max-w-7xl w-auto "></div>
        <div className="bg-gray-300 max-w-7xl w-full"></div>
        <div className="bg-gray-300 max-w-7xl w-full"></div>
    </div>
); */