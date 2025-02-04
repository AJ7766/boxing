interface FightProps {
    fighter1: string;
    fighter2: string;
}

export const Fight = ({ fighter1, fighter2 }: FightProps) => {
    return <h2 className="font-medium text-gray-600">{fighter1} vs {fighter2}</h2>
}