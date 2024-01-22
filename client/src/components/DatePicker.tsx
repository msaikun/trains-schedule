import { FieldProps, getIn }           from 'formik';
import dayjs, { Dayjs }                from 'dayjs';
import styled                          from 'styled-components';
import { Tooltip }                     from '@mui/material';
import { DemoContainer }               from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs }                from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }        from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker }              from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';


type SelectDateEventType = {
  target: {
    value: string | null;
    name?: string;
  };
};

interface IDatePickerProps {
  label?         : string;
  name?          : string;
  disablePast?   : boolean;
  withTime?      : boolean;
  disableFuture? : boolean;
  format?        : string;
  value?         : string | null;
  minDate?       : Dayjs;
  maxDate?       : Dayjs;
  readOnly?      : boolean;
  required?      : boolean;
  disabled?      : boolean;
  form?          : FieldProps['form'];
  field?         : FieldProps['field'];
  onChange?      : (event: SelectDateEventType) => void;
}

const dateFormat = 'MM/DD/YYYY';

export const DatePicker = ({
  name,
  disablePast,
  disableFuture,
  format   = dateFormat,
  withTime = false,
  readOnly = true,
  value,
  minDate,
  maxDate,
  required,
  disabled,
  onChange,
  form,
  field,
  ...props
}: IDatePickerProps) => {
  const error = getIn(form?.errors, field?.name || '');

  const handleChange = (inputValue: Dayjs | null) => {
    const newDate = dayjs(inputValue).format() || '';

    if (form && field) {
      form.setFieldValue(field.name, newDate);
    }

    if (!onChange) return;

    onChange({ target: { value: newDate, name } });
  };

  const Picker = withTime ? DateTimePicker : MuiDatePicker;

  return (
    <Tooltip title={error}>
      <DatePicker.Wrapper error={!!error}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <Picker
              value         = {field?.value ? dayjs(field.value) : value ? dayjs(value) : null}
              minDate       = {minDate && dayjs(minDate)}
              maxDate       = {maxDate && dayjs(maxDate)}
              disabled      = {disabled}
              name          = {name}
              disableFuture = {disableFuture}
              disablePast   = {disablePast}
              onChange      = {handleChange}
              slotProps     = {{ field: { readOnly } }}
              {...props}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DatePicker.Wrapper>
    </Tooltip>
  );
};

DatePicker.Wrapper = styled.div<{ error?: boolean }>`
  .MuiFormControl-root {
    background-color : white;
    width            : 100%;
  }

  .MuiStack-root {
    overflow: hidden;
  }


  .MuiInputBase-root {
    border-bottom: ${({ error }) => (error && '1px solid red')}
  }
`;
