"use client"
import { FightProps } from '@/types/fightsType';
import { createContext, useContext, useState } from 'react';

interface FightsState {
    fights?: FightProps[];
    totalFights?: number;
    isLoading?: boolean;
}

interface FightsContextProps {
    fights: FightsState;
    setFights: React.Dispatch<React.SetStateAction<FightsState>>;
}

const FightsContext = createContext<FightsContextProps | undefined>(undefined);

export const FightsProvider = ({ children }: { children: React.ReactNode }) => {
    const [fights, setFights] = useState<FightsState>({
        fights: [],
        totalFights: 0,
        isLoading: false
    })

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