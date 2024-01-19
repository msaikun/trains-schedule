import dayjs, { Dayjs }                from 'dayjs';
import { ReactNode, useCallback }      from 'react';
import { DemoContainer }               from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs }                from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider }        from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';

type TView = 'day' | 'month' | 'year';

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
  views?        : TView[];
  format?       : string;
  value?        : string | null;
  minDate?      : Dayjs;
  maxDate?      : Dayjs;
  defaultValue? : string | null;
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
  views,
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
  defaultValue,
  ...props
}: IDatePickerProps) => {
  // const handleChange = useCallback(
  //   (inputValue: Dayjs | null) => {
  //     const newDate = dayjs(inputValue).format();

  //     if (!onChange) return;

  //     onChange({ target: { value: newDate ?? '', name } });
  //   },
  //   [onChange],
  // );

  const handleChange = () => console.log('1111')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <MUIDatePicker
          value={value ? dayjs(value) : dayjs()}
          minDate       = {minDate && dayjs(minDate)}
          maxDate       = {maxDate && dayjs(maxDate)}
          disabled      = {disabled}
          format        = {format}
          disableFuture = {disableFuture}
          disablePast   = {disablePast}
          views         = {views}
          // defaultValue  = {dayjs(defaultValue)}
          onChange      = {handleChange}
          slotProps     = {{ field: { readOnly }}}
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};