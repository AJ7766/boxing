export const FightersTable = ({ fighter1, stats1, fighter2, stats2 }: { fighter1?: string | null, stats1?: string | null, fighter2?: string | null, stats2?: string | null }) => {
    return (
        <table className="border-collapse">
            <tbody>
                <tr className="text-xl font-bold leading-none">
                    <td className="pr-4 border-b-4 border-b-red-700">{fighter1}</td>
                    <td className="pr-4 border-b-4 border-b-gray-500">VS</td>
                    <td className="border-b-4 border-b-blue-500">{fighter2}</td>
                </tr>
                <tr className="font-semibold text-base">
                    <td>{stats1}</td>
                    <td></td>
                    <td>{stats2}</td>
                </tr>
            </tbody>
        </table>
    )
}
