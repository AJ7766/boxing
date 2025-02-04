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

export interface FighterTitle {
    name: string;
    id: string;
}

export interface Fighter {
    name: string;
    age: number;
    gender: string | null;
    height: string;
    nationality: string;
    nickname: string | null;
    reach: string;
    stance: string;
    stats: FighterStats;
    debut: string;
    id: string;
    division: string | null;
    titles: FighterTitle[];
}
