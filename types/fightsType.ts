import { FighterProps } from "./fighterType";

interface TitleProps {
    id: string;
    name: string;
}

export interface FightProps {
    id: string;
    title: string | null;
    slug: string | null;
    date: Date | null;
    location: string | null;
    results: {
        outcome: string;
        round: string;
    } | null;
    scheduledRounds: number | null;
    scores: string[];
    status: string | null;
    divisionName: string | null;
    event: {
        title: string | null;
        slug: string | null;
        date: Date | null;
        location: string | null;
        broadcasters: {
            [key: string]: string;
        }[];
        status: string | null;
        id: string;
    };
    titles: TitleProps[];
    fighter1: FighterProps| null;
    fighter2: FighterProps | null;
}