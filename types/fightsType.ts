export interface FighterStats {
    wins: number;
    losses: number;
    draws: number;
    total_bouts: number;
    total_rounds: number;
    ko_percentage: number;
    ko_wins: number;
    stopped: number;
}

export interface Fighter {
    name: string;
    full_name: string;
    age: number;
    height: string;
    nationality: string;
    reach: string;
    stance: string;
    stats: FighterStats;
    debut: string;
    id: string;
}

export interface FightProps {
    id: string;
    title: string;
    slug: string;
    date: string;
    date_str: string;
    fighters: {
        fighter_1: Fighter;
        fighter_2: Fighter;
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
