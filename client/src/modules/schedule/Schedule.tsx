import { useMemo, useState } from 'react';
import { Button, Grid, IconButton, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { DataTable } from '../../components/DataTable';
import { DatePicker } from '../../components/DatePicker';
import { UpdateTrainSchedule } from './UpdateTrainSchedule';
import { DeleteTrain } from './DeleteTrain';

interface IScheduleProps {
  isAdmin?: boolean;
}

export const Schedule = ({ isAdmin = false }: IScheduleProps) => {
  const [trainToEdit, setTrainToEdit]     = useState(null);
  const [trainToDelete, setTrainToDelete] = useState(null);

  const [from, setFrom] = useState('1');
  const [to, setTo] = useState('1');

  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  const basicTableHeaders: any = [
    { label: 'ID' },
    { label: 'From' },
    { label: 'To' },
    { label: 'Departure Time' },
    { label: 'Arrival Time' },
    { label: 'Price' },
    { label: 'Carriage Type' },
    { label: 'Status' },
  ];

  const basicTableRows: any[] = [
    [
      { value: 1 },
      { value: 'Lviv' },
      { value: 'Kyiv' },
      { value: '10/12/2022' },
      { value: '12/12/2022' },
      { value: 26.8 },
      { value: 'Compartment' },
      { value: 'OnTime' },
    ],
    [
      { value: 2 },
      { value: 'Kyiv' },
      { value: 'Lviv' },
      { value: '11/12/2022' },
      { value: '13/12/2022' },
      { value: 32.5 },
      { value: 'SecondClass' },
      { value: 'Delayed' },
    ],
    [
      { value: 3 },
      { value: 'Odessa' },
      { value: 'Kharkiv' },
      { value: '12/12/2022' },
      { value: '14/12/2022' },
      { value: 45.2 },
      { value: 'Luxe' },
      { value: 'OnTime' },
    ],
  ];

  const tableHeaders: any = useMemo(() => !isAdmin
    ? basicTableHeaders
    : [...basicTableHeaders, { label: 'Actions' }],
  [isAdmin]);

  const tableRows: any = useMemo(() => !isAdmin
    ? basicTableRows
    : basicTableRows.map((row) => [...row, { value: (
      <>
        <IconButton aria-label="edit" onClick={() => setTrainToEdit(row)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => setTrainToDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </>
    )}]),
  [isAdmin]);

  console.log('qqq', from, to, departureTime);

  console.log('tableRows', tableRows, basicTableRows.map((row) => [...row, { value: 'delete' }]))

  // TODO: delete any
  return (
    <>
      <Schedule.Search>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Schedule.TextField value={from} variant="outlined" onChange={(e) => setFrom(e.target.value)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Schedule.TextField value={to} onChange={(e) => setTo(e.target.value)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker value={''} onChange={(e) => console.log(e.target.value as any)} />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker value={''} onChange={(e) => console.log(e.target.value as any)} />
          </Grid>
        </Grid>

        <Schedule.ButtonsWrapper>
          {isAdmin && (
            <Button onClick={() => console.log('add')}>Add New Train To Schedule</Button>
          )}
          <Button variant="contained" onClick={() => console.log('found tickets')}>Found tickets</Button>
        </Schedule.ButtonsWrapper>
      </Schedule.Search>

      <Paper elevation={3} sx={{ margin: '30px', overflow: 'auto'}}>
        <DataTable
          rows={tableRows}
          headers={tableHeaders}
          title="Schedule"
          noResultText="no data"
        />
      </Paper>

      <UpdateTrainSchedule
        open={!!trainToEdit}
        handleClose={() => setTrainToEdit(null)}
        handleSubmit={() => setTrainToEdit(null)}
      />

      <DeleteTrain
        open={!!trainToDelete}
        handleClose={() => setTrainToDelete(null)}
        handleSubmit={() => setTrainToDelete(null)}
      />
    </>
  );
}

Schedule.Search = styled.div`
  margin: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #acaba7;
`;

Schedule.TextField = styled(TextField)`
  width: 100%;

  .MuiInputBase-root {
    background: white;
  }
`;

Schedule.ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;
