import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForwardedRef } from "react";

export const LinkC = ({ name, ref }: { name: string, ref: ForwardedRef<HTMLAnchorElement> }) => {
    const router = useRouter();
    const href = `/${name === 'news' ? '/' : name.toLocaleLowerCase()}`;

    return <Link
        ref={ref}
        prefetch={false}
        href={href}
        // Prefetching the hovered link for faster page loading
        onMouseEnter={() => router.prefetch(href)}
    >
        {name.toUpperCase()}
    </Link>
}