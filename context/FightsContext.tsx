"use client"
import { getFights } from '@/services/fightsServices';
import { FightProps } from '@/types/fightsType';
import { DateTime } from 'luxon';
import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface FightsState {
    fights?: FightProps[];
    totalFights?: number;
}

interface FightsContextProps {
    data: FightsState;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean
}

interface FightsProviderProps {
    children: React.ReactNode;
    start: number;
    end: number;
}

const FightsContext = createContext<FightsContextProps | undefined>(undefined);

export const FightsProvider = ({ children, start, end }: FightsProviderProps) => {
    const [query, setQuery] = useState('');

    const oneWeekAgo = DateTime.local().minus({ week: 1 }).toJSDate(); // 1 week ago
    // Fetching fights using useQuery
    const { data, isLoading } = useQuery({
        queryKey: ['fights', start, end, query], // Query key should depend on start, end, and query
        queryFn: async () => {
            const data = await getFights(query ?? '', start, end, oneWeekAgo);
            return JSON.parse(JSON.stringify(data));
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    return (
        <FightsContext.Provider value={{ data: data ?? { fights: [], totalFights: 0 }, setQuery, isLoading }}>
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
