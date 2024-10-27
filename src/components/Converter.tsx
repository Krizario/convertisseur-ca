import React, { useContext, useState } from 'react';
import { CurrencyExchangeContext } from '../context/CurrencyExchangeContext';
import { TextField } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  padding: 16px;
`;

const ConvertButton = styled.button`

    background-color: ${({ disabled }) => (disabled ? '#ddd' : '#0056b3')};
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #003d99;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
      cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;


const StyledTextField = styled(TextField)`
  & .MuiInputBase-input {
    color: #787878;
  }
  & .MuiInputLabel-root {
    color: #b3b3cc;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #b3b3cc;
      transition: border-color 0.3s ease;
    }
    &:hover fieldset {
      border-color: #ffffff;
    }
    &.Mui-focused fieldset {
      border-color: #ffffff;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    }
  }
`;

interface ConverterProps {
    isEUR: boolean;
    handleAmountChange: (amount: string, converted: string) => void;
    handleFixedRateChange: (isFixedRate: boolean, fixedRate: number) => void;
    setConversionActive: (active: boolean) => void;
    newConvertedAmount: string;
}

const Converter: React.FC<ConverterProps> = ({
    isEUR,
    handleAmountChange,
    handleFixedRateChange,
    setConversionActive,
    newConvertedAmount
}) => {
    const context = useContext(CurrencyExchangeContext);
    if (!context) {
        throw new Error('CurrencyExchangeContext must be used within a CurrencyExchangeProvider');
    }


    const { rate, isFixedRate, fixedRate, setFixedRate, setIsFixedRate } = context;
    const [localAmount, setLocalAmount] = useState<string>(''); // Stocke l'entrée de l'utilisateur avant la conversion
    const [convertedAmount, setConvertedAmount] = useState<string>(''); // Affiche la valeur convertie
    const [inputFixedRate, setInputFixedRate] = useState<string>(isFixedRate ? fixedRate.toString() : '');

    const handleConvert = () => {
        // Si le champ "Ajouter un taux fixe" est renseigné et valide
        const newFixedRate = parseFloat(inputFixedRate);
        if (!isNaN(newFixedRate) && newFixedRate > 0 && newFixedRate < 2) {
            setFixedRate(newFixedRate);
            setIsFixedRate(newFixedRate > 0 ? true : false);
            handleFixedRateChange(newFixedRate > 0 ? true : false, newFixedRate)
        }
        else {
            handleFixedRateChange(false, 0)

        }
        performConversion();
        setConversionActive(true); // Active les mises à jour automatiques en appelant la fonction passée en prop
    };


    const performConversion = () => {
        const actualRate = isFixedRate ? fixedRate : rate;
        const parsedAmount = parseFloat(localAmount);

        if (!isNaN(parsedAmount)) {
            const result = isEUR ? parsedAmount * actualRate : parsedAmount / actualRate;
            const converted = result.toFixed(2);
            setConvertedAmount(converted);
            handleAmountChange(localAmount, converted);
        } else {
            setConvertedAmount('');
            handleAmountChange('', '');
        }
    };

    const handleAmountChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalAmount(e.target.value);
    };

    const handleFixedRateChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFixedRate = parseFloat(e.target.value);
        setInputFixedRate(e.target.value);

        if (!isNaN(newFixedRate) && newFixedRate > 0 && newFixedRate < 2) {
            setFixedRate(newFixedRate);
            setIsFixedRate(true);
        } else {
            setIsFixedRate(false);
        }
    };

    return (
        <Container>
            <StyledTextField
                label={`Montant en ${isEUR ? 'EUR' : 'USD'}`}
                variant="outlined"
                value={localAmount}
                onChange={handleAmountChangeInternal}
                fullWidth
                margin="normal"
                className="my-2"
                type="number"
            />
            <StyledTextField
                label={`Montant Converti en ${isEUR ? 'USD' : 'EUR'}`}
                variant="outlined"
                value={newConvertedAmount ? newConvertedAmount : convertedAmount}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
                className="my-2"
            />
            <StyledTextField
                label="Ajouter un taux fixe"
                variant="outlined"
                value={inputFixedRate}
                onChange={handleFixedRateChangeInternal}
                fullWidth
                margin="normal"
                className="my-2"
                type="number"
            />
            <ConvertButton disabled={!localAmount} onClick={handleConvert}>Convertir</ConvertButton>
        </Container>
    );
};

export default Converter;
