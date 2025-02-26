import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";
import { ForwardedRef } from "react";

export const LinkC = ({ name, ref }: { name: string, ref: ForwardedRef<HTMLAnchorElement> }) => {
    return <li className={`${rajdhani.className} font-semibold text-base`}>
        <Link ref={ref} href={`/${name === 'news' ? '/' : name.toLocaleLowerCase()}`} prefetch={false}>{name.toUpperCase()}</Link>
    </li>
}