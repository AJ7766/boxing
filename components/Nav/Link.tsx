import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForwardedRef, useEffect } from "react";

export const LinkC = ({ name, ref }: { name: string, ref: ForwardedRef<HTMLAnchorElement> }) => {
    const router = useRouter();
    const href = `/${name === 'news' ? '/' : name.toLocaleLowerCase()}`;

    useEffect(() => {
        const handleLoad = () => {
            router.prefetch(href);
            console.log('Prefetched', href);
        };

        // Check if the document is already loaded
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, [href, router]); 

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