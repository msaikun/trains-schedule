import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter }                      from 'next/router';
import styled                             from 'styled-components';
import { Button, IconButton, Paper }      from '@mui/material';
import DeleteIcon                         from '@mui/icons-material/Delete';
import EditIcon                           from '@mui/icons-material/Edit';

import { DataTable, TDataTableRow } from '../../components/DataTable/DataTable';
import { useMutation }              from '../../hooks/useMutation';
import { useQuery }                 from '../../hooks/useQuery';
import { Loader } from '../../components/Loader';

import { transformToDataTableRows, debounce, removeUndefinedFields } from '../../utils/common';
import { DEBOUNCE_DEFAULT_TIME, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, basicTableHeaders } from '../../utils/constants';
import { EOrder, IDestination, IScheduleDataWithPagination, ISignUpUserInfo } from '../../utils/types';

import { ScheduleSearch }      from './SchedulesSearch';
import { UpdateTrainSchedule } from './UpdateTrainScheduleModal';
import { DeleteTrain }         from './DeleteTrainModal';

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

  const [sortOption, setSortOptions] = useState<{ order: EOrder, orderBy: string }>({ order: EOrder.Desc, orderBy: 'price' });

  const queryParams = removeUndefinedFields({ ...pagination, ...trainSearchInfo, ...sortOption });

  const { data, loading, refetch } = useQuery<IScheduleDataWithPagination>('schedule', { data: queryParams });
  const { data: loggedUserInfo, loading: isUserInfoLoading, error } = useQuery<ISignUpUserInfo>('users/info');

  const { mutate: deleteTrain, loading: isTrainDeleting } = useMutation(`schedule/${trainToDelete?.id}`, 'Train was successfully deleted from schedule', 'delete');
  const { mutate: logOut, loading: isLoggingOut }         = useMutation('auth/signout', 'You was signed out successfully');

  const isAdmin = useMemo(() => loggedUserInfo?.isAdmin || false, [loggedUserInfo]);

  const isPageLoading = useMemo(() => isTrainDeleting
    || isLoggingOut
    || isUserInfoLoading
    || loading,
    [isTrainDeleting, isLoggingOut, isUserInfoLoading, loading],
  );

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

  const updateTrainDetails = useCallback(async (values: IDestination) => {
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

  const onLogOutClick = useCallback(async () => {
    await logOut();
    router.push('signin');
  }, [logOut]);

  const handleSearchInfoChange = (property: string, value: string) => {
    const newTrainsSearchInfo = { ...trainSearchInfo, [property]: value };

    setTrainSearchInfo(newTrainsSearchInfo);
    refetch(removeUndefinedFields({ ...queryParams, [property]: value }));
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

  const onColumnSort = (key: string) => {
    const order = sortOption.orderBy === key && sortOption.order === EOrder.Asc ? EOrder.Desc : EOrder.Asc;
    const sortValues = { order, orderBy: key };

    console.log('sortValues', sortValues, 'sortOption', sortOption)
  
    refetch(removeUndefinedFields({ ...queryParams, ...sortValues }));
    setSortOptions(sortValues);
  };

  useEffect(() => {
    if (error) {
      onLogOutClick();
    }
  }, [error]);

  console.log('sortOption', sortOption);

  return (
    <>
      {isPageLoading && <Loader />}

      <Schedule.Wrapper isLoading={isPageLoading}>
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
            order               = {sortOption.order}
            orderBy             = {sortOption.orderBy}
            rowsPerPage         = {pagination.limit}
            headers             = {tableHeaders}
            loading             = {loading}
            noResultText        = "No available trains"
            onPageChange        = {onPageChange}
            onRowsPerPageChange = {onRowsPerPageChange}
            onColumnSort        = {onColumnSort}
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
      </Schedule.Wrapper>
    </>
  );
}

Schedule.LogOut = styled.div`
  display         : flex;
  justify-content : end;
  margin          : 20px 30px 0;
`;

Schedule.Wrapper = styled.div<{ isLoading: boolean }>(({ isLoading }) => `
  ${isLoading && `
    filter         : blur(1px);
    pointer-events : none;
  `}
`);
