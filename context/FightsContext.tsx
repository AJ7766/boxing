"use client"
import { getFights } from '@/services/fightsServices';
import { FightProps } from '@/types/fightsType';
import { DateTime } from 'luxon';
import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface FightsState {
    fights?: FightProps[];
    totalFights?: number;
    query?: string;
}

interface FightsContextProps {
    fights: FightsState;
    setFights: React.Dispatch<React.SetStateAction<FightsState>>;
    isLoading: boolean
}

interface FightsProviderProps {
    children: React.ReactNode;
    start: number;
    end: number;
}

const FightsContext = createContext<FightsContextProps | undefined>(undefined);

export const FightsProvider = ({ children, start, end }: FightsProviderProps) => {
    const [fights, setFights] = useState<FightsState>({
        fights: [],
        totalFights: 0,
        query: '',
    });

    const oneWeekAgo = DateTime.local().minus({ week: 1 }).toJSDate(); // 1 week ago

    // Fetching fights using useQuery
    const { data, isLoading } = useQuery({
        queryKey: ['fights', start, end, fights.query], // Query key should depend on start, end, and query
        queryFn: async () => {
            const data = await getFights(fights.query ?? '', start, end, oneWeekAgo);
            return JSON.parse(JSON.stringify(data));
        },
        staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
    });

    // Update state when data changes or is loading
    useEffect(() => {
        if (data) {
            setFights((prev) => ({
                ...prev,
                fights: data.fetchedFights,
                totalFights: data.totalFights,
            }))
        }
    }, [data, isLoading, fights.query]);

    return (
        <FightsContext.Provider value={{ fights, setFights, isLoading }}>
            {children}
        </FightsContext.Provider>
    );
};

export const useFights = () => {
    const context = useContext(FightsContext);
    if (!context) {
        throw new Error('useFights must be used within a FightsProvider');
    }
    return context;
};
