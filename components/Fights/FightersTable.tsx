export const FightersTable = ({ fighter1, stats1, fighter2, stats2 }: { fighter1?: string | null, stats1?: string | null, fighter2?: string | null, stats2?: string | null }) => {
    return (
        <div className="h-full flex flex-col justify-between items-start">
            <table>
                <tbody>
                    <tr className="relative text-xl font-bold leading-none
                    before:w-full before:absolute before:-bottom-[0.5px] before:left-0 before:h-[3px] 
                    before:bg-gradient-to-r before:from-red-600 before:to-blue-black before:to-blue-500 before:animate-pulse">
                        <td className="pr-4 inline-block">{fighter1}</td>
                        <td className="pr-4">VS</td>
                        <td>{fighter2}</td>
                    </tr>
                    <tr className="font-semibold text-base">
                        <td>{stats1}</td>
                        <td></td>
                        <td>{stats2}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
