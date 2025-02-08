import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";

export const LinkC = ({ name, link }: { name: string; link: string }) => {
    return <li className={`${rajdhani.className} font-semibold text-base`}>
        <Link href={`/${link}`} prefetch={false}>{name}</Link>
    </li>
}