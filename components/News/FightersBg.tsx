interface FightProps {
    fighter1?: string | null;
    fighter2?: string | null;
}

export const FightersBg = ({ fighter1, fighter2 }: FightProps) => {
    return (
        <div className="absolute h-auto top-0 flex flex-col justify-center overflow-hidden text-gray-200 opacity-60 text-[350px] font-semibold whitespace-nowrap leading-none">
            <p className="text-center">{fighter1} <br />{fighter2}</p>
        </div >
    );
};
