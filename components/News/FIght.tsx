interface FightProps {
    fighter1?: string | null;
    fighter2?: string | null;
}

export const Fight = ({ fighter1, fighter2 }: FightProps) => {
    return <h2 className="font-medium text-gray-600">{fighter1} vs {fighter2}</h2>
}