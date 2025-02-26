import { rajdhani } from "@/fonts/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForwardedRef } from "react";

export const LinkC = ({ name, ref }: { name: string, ref: ForwardedRef<HTMLAnchorElement> }) => {
    const router = useRouter();
    const href = `/${name === 'news' ? '/' : name.toLocaleLowerCase()}`;
    console.log("Href:", href)
    return <li className={`${rajdhani.className} font-semibold text-base`}>
        <Link
            ref={ref}
            prefetch={false}
            href={href}
            onMouseEnter={() => router.prefetch(href)}
        >
            {name.toUpperCase()}
        </Link>
    </li>
}