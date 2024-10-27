// CurrencyExchangeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyExchangeContextProps {
    rate: number;
    isFixedRate: boolean;
    setIsFixedRate: (value: boolean) => void;
    fixedRate: number;
    setFixedRate: (value: number) => void;
}

export const CurrencyExchangeContext = createContext<CurrencyExchangeContextProps | undefined>(undefined);

interface CurrencyExchangeProviderProps {
    children: ReactNode;
}

export const CurrencyExchangeProvider: React.FC<CurrencyExchangeProviderProps> = ({ children }) => {
    const [rate, setRate] = useState<number>(1.1);
    const [isFixedRate, setIsFixedRate] = useState<boolean>(false);
    const [fixedRate, setFixedRate] = useState<number>(1.1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isFixedRate) {
                const change = (Math.random() * 0.1 - 0.05); // Variation aléatoire entre -0.05 et +0.05
                setRate((prevRate) => Math.max(0.01, parseFloat((prevRate + change).toFixed(4))));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isFixedRate]);

    return (
        <CurrencyExchangeContext.Provider value={{ rate, isFixedRate, setIsFixedRate, fixedRate, setFixedRate }}>
            {children}
        </CurrencyExchangeContext.Provider>
    );
};
