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
                        width={500}
                        height={500}
                        quality={15}
                        loading='lazy'
                        className="w-auto transform transition-transform duration-300 ease-swoosh hover:scale-105"
                    />
                </Link>
            </div>
            {isClient && <span className="absolute top-2 left-2 text-white text-xl font-semibold drop-shadow-[2px_1px_2.5px_black]">{type}</span>}
        </div>
    )
}