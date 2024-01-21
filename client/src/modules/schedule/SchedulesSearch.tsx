import { Button, Grid, TextField } from "@mui/material";
import styled from "styled-components";
import { DatePicker } from "../../components/DatePicker";

interface IScheduleSearchProps {
  isAdmin: boolean;
  from: string;
  to: string;
  // ...
}

export const ScheduleSearch = ({
  isAdmin,
  from,
  to,
}: IScheduleSearchProps) => {
  return (
    <ScheduleSearch.Wrapper>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <ScheduleSearch.TextField
            value={from}
            onChange={(e) => console.log(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ScheduleSearch.TextField
            value={to}
            onChange={(e) => console.log(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            value={''}
            onChange={(e) => console.log(e.target.value as any)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DatePicker
            value={''}
            onChange={(e) => console.log(e.target.value as any)}
          />
        </Grid>
      </Grid>

      <ScheduleSearch.ButtonsWrapper>
        {isAdmin && (
          <Button onClick={() => console.log('add')}>Add New Train To Schedule</Button>
        )}
        <Button variant="contained" onClick={() => console.log('found tickets')}>Found tickets</Button>
      </ScheduleSearch.ButtonsWrapper>
    </ScheduleSearch.Wrapper>
  );
};

ScheduleSearch.Wrapper = styled.div`
  margin: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #acaba7;
`;

ScheduleSearch.TextField = styled(TextField)`
  width: 100%;

  .MuiInputBase-root {
    background: white;
  }
`;

ScheduleSearch.ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;

