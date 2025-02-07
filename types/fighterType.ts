export interface FighterStats {
    wins: number;
    losses: number;
    draws: number;
    totalBouts: number;
    totalRounds: number;
    koPercentage: number;
    koWins: number;
    stopped: number;
}

export interface FighterTitle {
    name: string;
    id: string;
}

export interface FighterProps {
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
