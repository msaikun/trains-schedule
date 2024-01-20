import dayjs, { Dayjs }                from 'dayjs';
import { ReactNode, useCallback }      from 'react';
import { DemoContainer }               from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs }                from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }        from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker }              from '@mui/x-date-pickers/DateTimePicker';
import styled from 'styled-components';

type SelectDateEventType = {
  target: {
    value : string | null;
    name? : string;
  };
};

interface IDatePickerProps {
  // label?        : string;
  name?         : string;
  disablePast?  : boolean;
  disableFuture?: boolean;
  format?       : string;
  value?        : string | null;
  minDate?      : Dayjs;
  maxDate?      : Dayjs;
  readOnly?     : boolean;
  // error?        : boolean;
  // helperText?   : ReactNode;
  required?     : boolean;
  // displayError? : boolean;
  disabled?     : boolean;
  onChange?     : (event: SelectDateEventType) => void;
}

const dateFormat = 'MM/DD/YYYY';

export const DatePicker = ({
  name,
  // label,
  disablePast,
  disableFuture,
  format = dateFormat,
  readOnly = true,
  value,
  // error,
  // helperText,
  minDate,
  maxDate,
  required,
  // displayError,
  disabled,
  onChange,
  ...props
}: IDatePickerProps) => {
  const handleChange = useCallback(
    (inputValue: Dayjs | null) => {
      const newDate = dayjs(inputValue).format();

      if (!onChange) return;

      onChange({ target: { value: newDate ?? '', name } });
    },
    [onChange],
  );

  return (
    <DatePicker.Wrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            value={value ? dayjs(value) : dayjs()}
            minDate={minDate && dayjs(minDate)}
            maxDate={maxDate && dayjs(maxDate)}
            disabled={disabled}
            // format        = {format}
            disableFuture={disableFuture}
            disablePast={disablePast}
            onChange={handleChange}
            slotProps={{ field: { readOnly } }}
            {...props}
          />
        </DemoContainer>
      </LocalizationProvider>
    </DatePicker.Wrapper>
  );
};

DatePicker.Wrapper = styled.div`
  .MuiFormControl-root {
    background-color: white;
  }
`;
