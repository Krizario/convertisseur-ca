import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

interface CurrencyToggleProps {
  isEUR: boolean;
  handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ isEUR, handleSwitchChange }) => {
  return (
    <FormControlLabel
      control={<Switch checked={isEUR} onChange={handleSwitchChange} />}
      label={isEUR ? 'de EUR à USD' : 'de USD à EUR'}
    />
  );
};

export default CurrencyToggle;
