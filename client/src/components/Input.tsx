import { FieldProps, getIn }        from 'formik';
import { ChangeEvent, useCallback } from 'react';
import { styled }                   from 'styled-components';
import { TextField, Tooltip }       from '@mui/material';

interface IInputProps extends FieldProps {
  label?      : string;
  disabled?   : boolean;
  isRequired? : boolean;
  placeholder : string;
  type?       : string;
  helperText  : string;
  name        : string;
  value       : string;
  error?      : string;
  onChange    : (value: string) => void;
}

export const Input = ({
  form,
  field,
  label,
  disabled = false,
  type     = 'text',
  placeholder,
  name,
  value,
  onChange,
  ...props
}: IInputProps) => {
  const error = getIn(form.errors, field.name);

  const onChangeInternal = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  
    if (onChange) onChange(value);

    let newValue;
    const parsedIntValue = parseInt(value, 10);

    if (type === 'number') {
      newValue = isNaN(parsedIntValue) ? null : parsedIntValue;
    } else {
      newValue = value || null;
    }

    if (form && field) {
      form.setFieldValue(field.name, newValue, false);
    }
  }, [onChange, form, field]);

  return (
    <Input.Container>
      <Tooltip title={error}>
        <TextField
          {...props}
          fullWidth
          size        = "small"
          label       = {label}
          name        = {name}
          disabled    = {disabled}
          error       = {!!error}
          type        = {type}
          value       = {field?.value || value}
          placeholder = {placeholder}
          onChange    = {onChangeInternal}
        />
      </Tooltip>
    </Input.Container>
  );
};

Input.Container = styled.div`
  display        : flex;
  flex-direction : row;
  position       : relative;
`;
