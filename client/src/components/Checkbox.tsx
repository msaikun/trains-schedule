import { FieldProps }              from 'formik';
import { useCallback }             from 'react';
import styled                      from 'styled-components';
import { Checkbox as MuiCheckbox } from '@mui/material';

export interface ICheckboxProps {
  form      : FieldProps['form'];
  field     : FieldProps['field'];
  label?    : string;
  disabled? : boolean;
}
export const Checkbox = ({
  form,
  field,
  disabled,
  label,
}: ICheckboxProps) => {
  const handleChange = useCallback((): void => {
    if (disabled) return;

    form.setFieldValue(field.name, !field.value);
  }, [disabled, field.name, field.value, form]);

  return (
    <Checkbox.Wrapper>
      <MuiCheckbox
        {...field}
        disabled = {disabled}
        checked  = {!!field.value}
        onChange = {handleChange}
        size     = "small"
        
      />
      {label && <p onClick={handleChange}>{label}</p>}
    </Checkbox.Wrapper>
  );
};

Checkbox.Wrapper = styled.div`
  display     : flex;
  align-items : center;
  height      : 12px;

  && p {
    font-size   : 12px;
    line-height : 12px;
    cursor      : pointer;
  }
`;

