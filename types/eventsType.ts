import { FightProps } from "./fightsType";

export interface BroadcasterProps {
    [country: string]: string;
};

interface DivisionProps {
    name: string;
    weight_lb: number | null;
    weight_kg: number | null;
    id: string;
}

export interface EventProps {
    title: string;
    slug: string;
    date: string;
    location: string;
    fights: FightProps[];
    division: DivisionProps;
    status: "NOT_STARTED" | "LIVE" | "FINISHED";
    broadcasters: BroadcasterProps[];
    id: string;
};