import { FighterProps } from "@/types/fighterType";

export const Table = ({ fighter }: { fighter: FighterProps | null }) => {
    return (
        <table className="table-auto min-w-52 border-collapse whitespace-nowrap">
            <thead>
                <tr>
                    <th className="border-b px-4 py-2 text-left">{fighter?.name || fighter?.nickname}</th>
                    <th className="border-b px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <TdTitle title="Total Fights" />
                    <TdContent content={fighter?.total_bouts} />
                </tr>
                <tr>
                    <TdTitle title="Total Wins" />
                    <TdContent content={fighter?.wins} />
                </tr>
                <tr>
                    <TdTitle title={`Wins by KO | ${fighter?.total_bouts && fighter?.ko_wins ? ((fighter?.ko_wins / fighter?.total_bouts) * 100).toFixed(0) : 0}%`} />
                    <TdContent content={fighter?.ko_wins} />
                </tr>
            </tbody>
        </table>
    )
}

const TdTitle = ({ title }: { title: string }) => {
    return <td className="font-medium border-b px-4 py-2">{title}</td>
}

const TdContent = ({ content }: { content?: number | null }) => {
    return <td className="border-b px-4 py-2 text-right">{content ? content : 'unknown'}</td>
}