import { useCallback, useMemo, useState } from 'react';
import { useRouter }                      from 'next/router';
import styled                             from 'styled-components';
import { Button, IconButton, Paper }      from '@mui/material';
import DeleteIcon                         from '@mui/icons-material/Delete';
import EditIcon                           from '@mui/icons-material/Edit';

import { DataTable, TDataTableRow } from '../../components/DataTable';
import { useMutation }              from '../../hooks/useMutation';
import { useQuery }                 from '../../hooks/useQuery';

import { transformToDataTableRows, debounce } from '../../utils/common';
import { DEBOUNCE_DEFAULT_TIME, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, basicTableHeaders } from '../../utils/constants';
import { IDestination, IScheduleDataWithPagination, ISignUpUserInfo } from '../../utils/types';

import { ScheduleSearch }      from './SchedulesSearch';
import { UpdateTrainSchedule } from './UpdateTrainScheduleModal';
import { DeleteTrain }         from './DeleteTrainModal';

const isAdmin = true;

export const Schedule = () => {
  const router = useRouter();

  const [trainToEdit, setTrainToEdit]     = useState<IDestination | null>(null);
  const [trainToDelete, setTrainToDelete] = useState<IDestination | null>(null);

  const [pagination, setPagenation] = useState({
    page  : DEFAULT_PAGE,
    limit : DEFAULT_PAGE_SIZE,
  });

  const [trainSearchInfo, setTrainSearchInfo] = useState({
    from          : '',
    to            : '',
    departureTime : '',
    arrivalTime   : '',
  });

  const { data: loggedUserInfo } = useQuery<ISignUpUserInfo>('users/info');

  console.log('trainSearchInfo', trainSearchInfo);

  const queryParams = { ...pagination, ...trainSearchInfo };

  const { data, loading, refetch } = useQuery<IScheduleDataWithPagination>('schedule', { data: queryParams });

  const { mutate: deleteTrain } = useMutation(`schedule/${trainToDelete?.id}`, 'Train was successfully deleted from schedule', 'delete');
  // const { mutate: logOut } = useMutation('signout', 'You was signed out successfully');

  const getRowActions = (row: { item: IDestination; tableRow: TDataTableRow }) => (
    <>
      <IconButton aria-label="edit" onClick={() => setTrainToEdit(row.item)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => setTrainToDelete(row.item)}>
        <DeleteIcon />
      </IconButton>
    </>
  );

  const tableHeaders = useMemo(() => !isAdmin
    ? basicTableHeaders
    : [...basicTableHeaders, { label: 'Actions' }],
  [isAdmin]);

  const basicTableRows = useMemo(() => transformToDataTableRows(data?.items || []), [data?.items]);

  const tableRows: TDataTableRow[] = useMemo(() => !isAdmin
    ? basicTableRows.map((row) => row.tableRow)
    : basicTableRows.map((row) => [...row.tableRow, { value: getRowActions(row)}]),
  [isAdmin, basicTableRows]);

  const deleteTrainFromSchedule = useCallback(async () => {
    if (trainToDelete?.id) {
      await deleteTrain();
    }
    
    await refetch({ ...queryParams });

    setTrainToDelete(null);
  }, [trainToDelete?.id, queryParams]);

  const updateTrainDetails = useCallback(async () => {
    setTrainToEdit(null);
    await refetch({ ...queryParams });
  }, [queryParams]);

  const onPageChange = useCallback((page: number) => {
    setPagenation({ ...pagination, page });
    refetch({ ...queryParams, page: page + 1 });
  }, [queryParams]);

  const onRowsPerPageChange = useCallback((limit: number) => {
    setPagenation({ ...pagination, limit });
    refetch({ ...queryParams, limit });
  }, [queryParams]);

  const onLogOutClick = useCallback(() => {
    // logOut();
    // я не оторимую юзера через те, що на беку не можу отримати юзера по токену.
    // бачу, що токен, який я отримую при сайт іні відрізняється від того, який бачу в аплікейшин
    // хочу додати логіку на беку, що бзер який зареєструвався відразу логіниться, щоб я могла отримати токен
  }, []);

  const handleSearchInfoChange = (property: string, value: string) => {
    const newTrainsSearchInfo = { ...trainSearchInfo, [property]: value };

    setTrainSearchInfo(newTrainsSearchInfo);
    refetch({ ...queryParams, [property]: value });
  };

  const onFromCityChange = debounce((from: string) => {
    handleSearchInfoChange('from', from);
  }, DEBOUNCE_DEFAULT_TIME);

  const onToCityChange = debounce((to: string) => {
    handleSearchInfoChange('to', to);
  }, DEBOUNCE_DEFAULT_TIME);

  const onStartDateChange = (departureTime: string) => {
    handleSearchInfoChange('departureTime', departureTime);
  };

  const onEndDateChange = (arrivalTime: string) => {
    handleSearchInfoChange('arrivalTime', arrivalTime);
  };

  return (
    <>
      <Schedule.LogOut>
        <Button variant="contained" onClick={onLogOutClick}>
          Log Out
        </Button>
      </Schedule.LogOut>

      <ScheduleSearch
        isAdmin           = {isAdmin}
        setTrainToEdit    = {setTrainToEdit}
        onFromCityChange  = {onFromCityChange}
        onToCityChange    = {onToCityChange}
        onStartDateChange = {onStartDateChange}
        onEndDateChange   = {onEndDateChange}
      />

      <Paper elevation={3} sx={{ margin: '30px', overflow: 'auto' }}>
        <DataTable
          rows                = {tableRows}
          page                = {Number(data?.currentPage) - 1 || 0}
          totalItems          = {data?.totalItems || 0}
          rowsPerPage         = {pagination.limit}
          headers             = {tableHeaders}
          loading             = {loading}
          noResultText        = "No available trains"
          onPageChange        = {onPageChange}
          onRowsPerPageChange = {onRowsPerPageChange}
        />
      </Paper>

      <UpdateTrainSchedule
        open         = {!!trainToEdit}
        train        = {trainToEdit as IDestination}
        handleClose  = {() => setTrainToEdit(null)}
        handleSubmit = {updateTrainDetails}
      />

      <DeleteTrain
        open         = {!!trainToDelete}
        handleClose  = {() => setTrainToDelete(null)}
        handleSubmit = {deleteTrainFromSchedule}
      />
    </>
  );
}

Schedule.LogOut = styled.div`
  display         : flex;
  justify-content : end;
  margin          : 20px 30px 0;
`;
