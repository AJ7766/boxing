import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForwardedRef, useEffect } from "react";

export const LinkC = ({ name, ref }: { name: string, ref: ForwardedRef<HTMLAnchorElement> }) => {
    const router = useRouter();
    const href = `/${name === 'news' ? '/' : name.toLocaleLowerCase()}`;

    useEffect(() => {
        const handleLoad = () => {
            // Prefetch after the window has finished loading
            router.prefetch(href);
        };

        // Attach the load event listener
        window.addEventListener('load', handleLoad);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('load', handleLoad);
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