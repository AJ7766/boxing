"use server"

import { prisma } from "@/lib/prisma"

export const getFight = async (id: string) => {
    return await prisma.fight.findUnique({
        where: { id },
        select: {
            title: true,
            location: true,
            date: true,
            fighter1: { select: { name: true, nickname: true } },
            fighter2: { select: { name: true, nickname: true } },
        },
    });
};
