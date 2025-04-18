import React from 'react';
import { FormControl, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface DropDownProps {
  options: Option[];
  value: string | null;
  placeholder?: string;
  width?: string | number;
  helpText?: string;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  onChange,
  value,
  helpText,
  placeholder = 'Select an option',
  width = '100%',
}) => {
  return (
    <FormControl sx={{ width }} size='small'>
      <Select
        value={value || ''}
        onChange={onChange}
        displayEmpty
        renderValue={(selected: unknown) => {
          if (!selected) {
            return <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>{placeholder}</span>;
          }
          const selectedOption = options.find((opt: Option) => opt.value === selected);
          return selectedOption?.label || String(selected);
        }}
        sx={{ width: '100%' }}
      >
        {options.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helpText}</FormHelperText>
    </FormControl>
  );
};

export default DropDown;
