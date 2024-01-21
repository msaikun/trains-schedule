import { useCallback, useMemo, useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { DataTable, TDataTableRow } from '../../components/DataTable';
import { UpdateTrainSchedule } from './UpdateTrainSchedule';
import { DeleteTrain } from './DeleteTrain';
import { IDestination, IScheduleDataWithPagination } from '../../utils/types';
import { ScheduleSearch } from './SchedulesSearch';
import { useMutation } from '../../hooks/useMutation';
import { useQuery } from '../../hooks/useQuery';
import { transformToDataTableRows } from '../../utils/commonFunctions';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, basicTableHeaders } from '../../utils/constants';

interface IScheduleProps {
  isAdmin?: boolean;
}

export const Schedule = ({ isAdmin = true }: IScheduleProps) => {
  const [trainToEdit, setTrainToEdit] = useState<IDestination | null>(null);
  const [trainToDelete, setTrainToDelete] = useState<IDestination | null>(null);

  const [from, setFrom] = useState('1');
  const [to, setTo] = useState('1');

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);

  const { data, loading, refetch } = useQuery<IScheduleDataWithPagination>('schedule', { data: { from: 'Lviv', to: 'Kyiv', page, limit: rowsPerPage } });

  console.log('-111', page, rowsPerPage, data);
  const { mutate: deleteTrain } = useMutation('schedule', 'Train was successfully deleted from schedule');

  const basicTableRows = useMemo(() => transformToDataTableRows(data?.items || []), [data?.items]);

  const tableHeaders = useMemo(() => !isAdmin
    ? basicTableHeaders
    : [...basicTableHeaders, { label: 'Actions' }],
    [isAdmin]);

  const tableRows: TDataTableRow[] = useMemo(() => !isAdmin
    ? basicTableRows.map((row) => row.tableRow)
    : basicTableRows.map((row) => [...row.tableRow, {
      value: (
        <>
          <IconButton aria-label="edit" onClick={() => setTrainToEdit(row.item)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => setTrainToDelete(row.item)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }]),
  [isAdmin, basicTableRows]);

  const deleteTrainFromSchedule = useCallback(async () => {
    await deleteTrain(trainToDelete?.id);
    setTrainToDelete(null);
  }, [trainToDelete?.id]);

  const updateTrainDetails = useCallback(async () => {
    // await 
    setTrainToEdit(null);
  }, []);

  const onPageChange = useCallback((page: number) => {
    setPage(page);
    refetch();
  }, []);

  const onRowsPerPageChange = useCallback((rowsPerPage: number) => {
    setRowsPerPage(rowsPerPage);
    refetch();
  }, []);

  return (
    <>
      <ScheduleSearch from={from} to={to} isAdmin={isAdmin} />

      <Paper elevation={3} sx={{ margin: '30px', overflow: 'auto' }}>
        <DataTable
          rows={tableRows}
          page={page}
          rowsPerPage={rowsPerPage}
          headers={tableHeaders}
          loading={loading}
          noResultText="No available trains"
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>

      <UpdateTrainSchedule
        open={!!trainToEdit}
        handleClose={() => setTrainToEdit(null)}
        handleSubmit={updateTrainDetails}
      />

      <DeleteTrain
        open={!!trainToDelete}
        handleClose={() => setTrainToDelete(null)}
        handleSubmit={deleteTrainFromSchedule}
      />
    </>
  );
}
