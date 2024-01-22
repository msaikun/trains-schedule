import styled from 'styled-components';
import { Button, Grid, TextField } from '@mui/material';

import { DatePicker } from '../../components/DatePicker';
import { IDestination } from '../../utils/types';

interface IScheduleSearchProps {
  isAdmin           : boolean;
  setTrainToEdit    : (train: IDestination) => void;
  onFromCityChange  : (from: string) => void;
  onToCityChange    : (to: string) => void;
  onStartDateChange : (date: string) => void;
  onEndDateChange   : (date: string) => void;
}

export const ScheduleSearch = ({
  isAdmin,
  setTrainToEdit,
  onFromCityChange,
  onToCityChange,
  onStartDateChange,
  onEndDateChange,
}: IScheduleSearchProps) => (
  <ScheduleSearch.Wrapper>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <ScheduleSearch.TextField label="From" onChange={(e) => onFromCityChange(e.target.value)} />
      </Grid>

      <Grid item xs={12} md={6}>
        <ScheduleSearch.TextField label="To" onChange={(e) => onToCityChange(e.target.value)} />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePicker label="Departure Date" onChange={(e) => onStartDateChange(e.target.value as string)} />
      </Grid>

      <Grid item xs={12} md={6}>
        <DatePicker label="Arrival Date" onChange={(e) => onEndDateChange(e.target.value as string)} />
      </Grid>
    </Grid>

    <ScheduleSearch.ButtonsWrapper>
      {isAdmin && (
        <Button onClick={() => setTrainToEdit({} as IDestination)}>
          Add New Train To Schedule
        </Button>
      )}
    </ScheduleSearch.ButtonsWrapper>
  </ScheduleSearch.Wrapper>
);

ScheduleSearch.Wrapper = styled.div`
  margin        : 30px;
  padding       : 20px;
  background    : #f5f5f5;
  border-radius : 5px;
  box-shadow    : 2px 2px 10px #acaba7;
`;

ScheduleSearch.TextField = styled(TextField)`
  width: 100%;

  .MuiInputBase-root {
    background: white;
  }
`;

ScheduleSearch.ButtonsWrapper = styled.div`
  display         : flex;
  justify-content : end;
  margin-top      : 10px;
`;

