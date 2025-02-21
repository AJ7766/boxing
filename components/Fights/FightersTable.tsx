export const FightersTable = ({ fighter1, stats1, fighter2, stats2 }: { fighter1?: string | null, stats1?: string | null, fighter2?: string | null, stats2?: string | null }) => {
    return (
        <table className="border-collapse">
            <tbody>
                <tr className="text-xl font-bold">
                    <td className="pr-4">{fighter1}</td>
                    <td className="pr-4">VS</td>
                    <td>{fighter2}</td>
                </tr>
                <tr className="font-medium">
                    <td>{stats1}</td>
                    <td></td>
                    <td>{stats2}</td>
                </tr>
            </tbody>
        </table>
    )
}
