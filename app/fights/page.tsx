import { FightCards } from "@/components/Fights/FightCards";
import { Pagination } from "@/components/Fights/Pagination";
import { Search } from "@/components/Fights/Search";
import { FightsProvider } from "@/context/FightsContext";
import { QueryClientProviderWrapper } from "@/context/QueryContext";
import { rajdhani } from "@/fonts/fonts";
import { getSearchParams } from "@/services/fightsServices";


export default async function Fights({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { page, per_page, start, end } = await getSearchParams({ searchParams });
    
    return (
        <main className={`${rajdhani.className} bg-white text-lg whitespace-nowrap flex flex-col gap-20 py-12`}>
            <h2 className="text-center text-4xl font-semibold">UPCOMING</h2>
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