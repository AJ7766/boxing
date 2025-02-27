import { FightCards } from "@/components/Fights/FightCards";
import { Pagination } from "@/components/Fights/Pagination";
import { Search } from "@/components/Fights/Search";
import { Title } from "@/components/Title";
import { FightsProvider } from "@/context/FightsContext";
import { QueryClientProviderWrapper } from "@/context/QueryContext";
import { getSearchParams } from "@/services/fightsServices";

export default async function Fights({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { page, per_page, start, end } = await getSearchParams({ searchParams });
    return (
        <main className={`bg-white text-lg whitespace-nowrap flex flex-col justify-center gap-20 py-12 px-6`}>
            <Title>UPCOMING TITLE FIGHTS</Title>
            <QueryClientProviderWrapper>
                <FightsProvider start={start} end={end}>
                    <Search />
                    <FightCards />
                    <Pagination
                        page={page}
                        per_page={per_page}
                        start={start}
                        end={end}
                    />
                </FightsProvider>
            </QueryClientProviderWrapper>
        </main>
    )
}

export const metadata = {
    title: "Fights - Boxing",
    description: "Generated by create next app",
};