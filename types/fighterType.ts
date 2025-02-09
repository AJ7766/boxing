export interface StatsProps {
    wins?: number | null;
    losses?: number | null;
    draws?: number | null;
    total_bouts?: number | null;
    total_rounds?: number | null;
    ko_percentage?: number | null;
    ko_wins?: number | null;
    stopped?: number | null;
}

export interface TitleProps {
    id: string;
    name: string;
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
    wins?: number | null;
    losses?: number | null;
    draws?: number | null;
    total_bouts?: number | null;
    total_rounds?: number | null;
    ko_percentage?: number | null;
    ko_wins?: number | null;
    stopped?: number | null;
    debut?: string | null;
    divisionName?: string | null;
    divisionSlug?: string | null;
    weightLb?: number | null;
    weightKg?: number | null;
    titleNames?: TitleProps[] | null;
}
