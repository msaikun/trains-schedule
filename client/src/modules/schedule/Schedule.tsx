import { Button, Paper, TextField } from '@mui/material';
import { DataTable } from '../../components/DataTable';
import { useState } from 'react';
import { DatePicker } from '../../components/DatePicker';
import styled from 'styled-components';

export const Schedule = () => {
  const tableHeaders: any = [
    { label: 'ID', align: 'left' },
    { label: 'Name', align: 'center' },
    { label: 'Age', align: 'right' },
  ];

  const tableRows: any = [
    [
      { value: 1, align: 'left' },
      { value: 'John Doe', align: 'center' },
      { value: 25, align: 'right' },
    ],
    [
      { value: 2, align: 'left' },
      { value: 'Jane Smith', align: 'center' },
      { value: 30, align: 'right' },
    ],
    [
      { value: 3, align: 'left' },
      { value: 'Maryna', align: 'center' },
      { value: 21, align: 'right' },
    ],
  ];


  const [from, setFrom] = useState('1');
  const [to, setTo] = useState('1');
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  console.log('qqq', from, to, departureTime);

  // TODO: delete any

  return (
    <>
      <Schedule.Search>
        <Schedule.TextField value={from} variant="outlined" onChange={(e) => setFrom(e.target.value)} />
        <Schedule.TextField value={to} onChange={(e) => setTo(e.target.value)} />
        <div>
          <div style={{ display: 'flex' }}>
            <DatePicker value={''} onChange={(e) => console.log(e.target.value as any)} />
            <DatePicker value={''} onChange={(e) => console.log(e.target.value as any)} />
          </div>
          <Button onClick={() => console.log('found tickets')}>Found tickets</Button>
        </div>
      </Schedule.Search>

      <Paper elevation={3} sx={{ margin: '30px' }}>
        <DataTable
          rows={tableRows}
          headers={tableHeaders}
          title="Schedule"
          noResultText="no data"
        />
      </Paper>
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
  padding-right: 5px;
  .MuiInputBase-root {
    background: white;
  }
`;
