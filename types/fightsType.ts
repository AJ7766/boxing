import { FighterProps, TitleProps } from "./fighterType";

interface ResultProps {
    outcome?: string;
    round?: string;
}

export interface BroadcastProps {
    country: string;
    network: string;
}

export interface FightProps {
    id: string;
    title: string | null;
    date: Date | null;
    location: string | null;
    result?: ResultProps;
    scheduledRounds: number | null;
    scores: string[];
    status: string | null;
    division: string | null;
    broadcasters?: BroadcastProps[];
    titles: TitleProps[];
    fighter1: FighterProps | null;
    fighter2: FighterProps | null;
}