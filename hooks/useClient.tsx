"use client"

import { useLayoutEffect, useState } from "react";

export const useIsClient = () => {
    const [isClient, setIsClient] = useState(false);

    useLayoutEffect(() => {
        setIsClient(true);
    }, []);

    return isClient
}