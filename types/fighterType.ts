export interface StatsProps {
    wins?: number | null;
    losses?: number | null;
    draws?: number | null;
    totalBouts?: number | null;
    totalRounds?: number | null;
    koPercentage?: number | null;
    koWins?: number | null;
    stopped?: number | null;
}

export interface TitleProps {
    titleId?: string;
    titleName?: string;
}

export interface FighterProps {
    id?: string;
    name?: string | null;
    age?: number | null;
    gender?: string | null;
    height?: string | null;
    nationality?: string | null;
    nickname?: string | null;
    reach?: string | null;
    stance?: string | null;
    stats?: StatsProps;
    debut?: string | null;
    divisionName?: string | null;
    divisionSlug?: string | null;
    weightLb?: number | null;
    weightKg?: number | null;
    titleNames?: TitleProps[] | null;
}
