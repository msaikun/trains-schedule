import { Box, MenuItem, Select, Typography } from '@mui/material';
import { useCallback } from 'react';
import { FieldProps, getIn } from 'formik';
import styled from 'styled-components';

interface IOption {
  label: string;
  value: string;
}

interface IDropdownProps extends FieldProps {
  label: string;
  options: IOption[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown = ({
  field,
  form,
  label,
  options,
  placeholder = 'Select Value',
  value,
  onChange
}: IDropdownProps) => {
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  const renderValue = useCallback(() => (
    <Typography>
      {value ? value : placeholder}
    </Typography>
  ), [placeholder, value]);

  const handleChange = useCallback((value: string) => {
    field.onChange({ target: { value, name: field.name } });

    onChange?.(value);
  }, [field]);

  return (
    <Dropdown.Wrapper>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        placeholder={placeholder}
        renderValue={renderValue}
        label={label}
        error={touched && !!error}
        onChange={(e) => handleChange(e.target.value)}
      >
        {!options.length
          ? (
            <MenuItem disabled>
              No Options Available
            </MenuItem>
          )
          : options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
      </Select>
    </Dropdown.Wrapper>
  );
};

Dropdown.Wrapper = styled(Box)`
  .MuiInputBase-root {
    width: 100%;
  }
`;
