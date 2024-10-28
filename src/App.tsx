import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CurrencyExchangeProvider, CurrencyExchangeContext } from './context/CurrencyExchangeContext';
import Converter from './components/Converter';
import History from './components/History';
import CurrencyToggle from './components/CurrencyToggle';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import { formatDate } from './utils/formatDate';

interface HistoryEntry {
  realRate: number;
  fixedRate: number | '-';
  initialValue: string;
  initialCurrency: string;
  convertedValue: string;
  convertedCurrency: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9;
    color: #ffffff;
    font-family: Montserrat, system-ui, ui-sans-serif, sans-serif;
  }
`;

const Title = styled.h3`
  font-size: 1.9rem;
  color: GREY;
  margin-bottom: 16px;
`;


const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blink = keyframes`
  0% {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
  100% {
    border-color: transparent;
  }
`;

const CenteredContainer = styled.div`
min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #f9f9f9;
  color: #787878;
`;

const ConverterWrapper = styled.div`
  max-width: 600px; /* Ajuste la largeur maximale selon celle de ton composant Converter */
  width: 100%;
  text-align: left;
  white-space: pre-line; /* Permet de gérer les sauts de ligne */
`;

const LineWrapper = styled.div<{ length: number; hideCursor: boolean }>`
  display: inline-block;
  overflow: hidden;
  border-right: 3px solid black;
  white-space: nowrap;

  animation: ${typing} ${({ length }) => length * 0.1}s steps(${({ length }) => length}, end) forwards,
    ${({ hideCursor }) => (hideCursor ? 'none' : css`${blink} 0.75s step-end infinite`)};

  ${({ hideCursor }) =>
    hideCursor &&
    css`
      border-right: none;
    `}
`;


const InfoBlock = styled.div`
  background: #f1f1f1;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;


const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isEUR, setIsEUR] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [selectedFixedRate, setSelectedFixedRate] = useState<number | '-'>('-');
  const [isFixedRateEnabled, setIsFixedRateEnabled] = useState<boolean>(false);
  const [conversionActive, setConversionActive] = useState<boolean>(false);
  const [currentRate, setCurrentRate] = useState<number>(1.1);
  const [isCurrencyToggleEnabled, setIsCurrencyToggleEnabled] = useState<boolean>(true);


  // on fait appel au context
  const context = useContext(CurrencyExchangeContext);
  // Si pas de context on émet une erreur
  if (!context) {
    throw new Error('CurrencyExchangeContext doit être utilisé dans un CurrencyExchangeProvider');
  }
  const { isFixedRate, fixedRate } = context;

  // Fonction qui gère l'action du Switch
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEUR(event.target.checked);
    setAmount(convertedAmount);
  };

  // Fonction qui écoute le changement sur les inputs montant initial et converti provenant du composant Converter
  const handleAmountChange = (newAmount: string, converted: string) => {
    setAmount(newAmount);
    setConvertedAmount(converted);
  };

  // Fonction qui écoute le changement sur l'input du taux fixé 
  const handleFixedRateChange = (isFixedRate: boolean, fixedRate: number) => {
    setIsFixedRateEnabled(isFixedRate);
    setSelectedFixedRate(fixedRate);
  };

  // Fonction qui gère l'historique
  const handleAddToHistory = useCallback(
    () => {
      if (!amount || !convertedAmount) return;
      const newEntry: HistoryEntry = {
        realRate: currentRate,
        fixedRate: isFixedRateEnabled ? selectedFixedRate : '-',
        initialValue: amount,
        initialCurrency: isEUR ? 'EUR' : 'USD',
        convertedValue: convertedAmount,
        convertedCurrency: isEUR ? 'USD' : 'EUR',
      };
  
      setHistory((prevHistory) => {
        const existingIndex = prevHistory.findIndex(
          (entry) =>
            entry.initialValue === newEntry.initialValue &&
            entry.initialCurrency === newEntry.initialCurrency &&
            entry.fixedRate === newEntry.fixedRate
        );
  
        if (existingIndex !== -1) {
          const updatedHistory = [...prevHistory];
          updatedHistory[existingIndex] = {
            ...updatedHistory[existingIndex],
            convertedValue: convertedAmount,
            realRate: currentRate,
            fixedRate: isFixedRateEnabled ? selectedFixedRate : '-',
          };
          return updatedHistory;
        } else {
          return [newEntry, ...prevHistory].slice(0, 5);
        }
      });
    },
    [amount, convertedAmount, currentRate, isEUR, isFixedRateEnabled, selectedFixedRate] 
);

  // Appeler handleAddToHistory après la mise à jour de convertedAmount
  useEffect(() => {
    if (convertedAmount) {
      handleAddToHistory(); // On déclenche cet appel pour faire greffer immédiatement le résultat history
    }
  }, [convertedAmount, handleAddToHistory]);

  // Fonction qui permet de faire des mises à jour aléatoires entre -0.05 et +0.05 comme défini dans le besoin

const updateRateRandomly = useCallback(
  () => {
    if (!isFixedRate) {
      const randomChange = Math.random() * 0.1 - 0.05; // Valeur aléatoire entre -0.05 et +0.05
      setCurrentRate((prevRate) => Math.max(0.01, prevRate + randomChange));
    }
  },
  [isFixedRate] 
);
  // hook UseEffect pour déclencher la mise à jour automatique chaque 3 secondes en faisant appel à la fonction updateRateRandomly()
  useEffect(() => {
    if (conversionActive && !isFixedRateEnabled) {
      const interval = setInterval(() => {
        updateRateRandomly();

        const actualRate = currentRate;
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount)) {
          const result = isEUR ? parsedAmount * actualRate : parsedAmount / actualRate;
          const converted = result.toFixed(2);
          setConvertedAmount(converted);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [conversionActive, currentRate, isFixedRateEnabled, fixedRate, amount, isEUR, updateRateRandomly]);

  // UseEffect qui renvoie le currentRate à sa valeur correspondante au Toggle ( EUR ou USD )
  useEffect(() => {
    if (!isCurrencyToggleEnabled) {
      setCurrentRate(0.9); // Lorsque le toggle est désactivé, le taux devient 0.9
    } else {
      setCurrentRate(1.1); // Rétablit le taux à 1.1 par défaut lorsque le toggle est activé
    }

  }, [isCurrencyToggleEnabled]);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Utiliser useEffect pour mettre à jour la date chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      // Incrémente d'une seconde la date de référence
      setCurrentDate((prevDate) => new Date(prevDate.getTime() + 1000));
    }, 1000); // Met à jour toutes les secondes

    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  const formattedDate = formatDate(currentDate);
 
  const lines = useMemo(
    () => [
      "Ce convertisseur s'actualise chaque 3 secondes",
      "Vous pouvez aussi appliquer un taux fixe si taux < 2%"
    ],
    []
  );
  const displayedRate = isFixedRate ? fixedRate : currentRate.toFixed(4);
  const inverseRate = isEUR ? displayedRate : Number(1 / Number(displayedRate)).toFixed(4);
  const rateInfo = `Le taux de change actuel est de 1 ${isEUR ? 'EUR' : 'USD'} = ${inverseRate} ${isEUR ? 'USD' : 'EUR'}`;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  // Pour générer des lignes animées
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      const typingDuration = currentLine.length * 100;

      const showLineTimeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
      }, typingDuration + 500);

      return () => clearTimeout(showLineTimeout);
    }
  }, [currentLineIndex, lines]);

  return (
    <CurrencyExchangeProvider>
      <GlobalStyle />
      <CenteredContainer>
        <ConverterWrapper>
          <Title>Convertisseur EUR/USD</Title>
          <p>Aujourd'hui, nous sommes le {formattedDate}.</p>
          {displayedLines.map((line, index) => (
            <LineWrapper
              key={index}
              length={line.length}
              hideCursor={true}
            >
              {line}
            </LineWrapper>
          ))}
          <InfoBlock>
            {rateInfo}
          </InfoBlock>
          <div>
            <CurrencyToggle
              isEUR={isEUR}
              handleSwitchChange={handleSwitchChange}
            />
            <Converter
              isEUR={isEUR}
              newConvertedAmount={convertedAmount}
              handleAmountChange={handleAmountChange}
              handleFixedRateChange={handleFixedRateChange}
              setConversionActive={setConversionActive}
            />
            <History history={history} />
          </div>
        </ConverterWrapper>
      </CenteredContainer>
    </CurrencyExchangeProvider>
  );
};

export default App;
