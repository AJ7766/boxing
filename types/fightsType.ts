import { FighterProps } from "./fighterType";

export interface FightProps {
    id: string;
    title: string;
    slug: string;
    date: string;
    fighters: {
        fighter_1: FighterProps;
        fighter_2: FighterProps;
    };
    location: string;
    results: {
        outcome: string;
        round: string;
    } | null;
    scheduled_rounds: number;
    scores: string[];
    status: string;
    division: {
        name: string;
        weight_lb: number | null;
        weight_kg: number | null;
        id: string;
    };
    event: {
        title: string;
        slug: string;
        date: string;
        location: string;
        broadcasters: {
            [key: string]: string;
        }[];
        status: string;
        id: string;
    };
}