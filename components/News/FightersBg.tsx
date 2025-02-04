interface FightProps {
    fighter1: string;
    fighter2: string;
}

export const FightersBg = ({ fighter1, fighter2 }: FightProps) => {
    return (
        <div className="absolute w-screen h-full flex flex-col justify-center overflow-hidden text-gray-200 opacity-60 text-[350px] font-semibold whitespace-nowrap leading-none">
            <p className="text-center">{fighter1} <br />{fighter2}</p>
        </div >
    );
};
