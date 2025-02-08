"use client"
import { getFights } from '@/services/fightsServices';
import { FightProps } from '@/types/fightsType';
import { createContext, useContext, useEffect, useState } from 'react';

interface FightsState {
    fights?: FightProps[];
    totalFights?: number;
    query?: string;
    isLoading?: boolean;
}

interface FightsContextProps {
    fights: FightsState;
    setFights: React.Dispatch<React.SetStateAction<FightsState>>;
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
        isLoading: false
    })

    // Fetching fights initially, and when query changes
    useEffect(() => {
        setFights(prev => ({ ...prev, isLoading: true }));
        const timeout = setTimeout(async () => {
            const { fetchedFights, totalFights } = await getFights(fights.query ?? '', start, end);
            setFights(prev => ({
                ...prev,
                fights: JSON.parse(JSON.stringify(fetchedFights)),
                totalFights: totalFights,
                isLoading: false
            }));
        }, 300);
        return () => clearTimeout(timeout);
    }, [fights.query, start, end]);

    return (
        <FightsContext.Provider value={{ fights, setFights }}>
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