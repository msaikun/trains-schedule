import { TableSortLabel, TableSortLabelOwnProps } from '@mui/material';
import ArrowDropDownIcon                          from '@mui/icons-material/ArrowDropDown';
import styled                                     from 'styled-components';

import { EOrder }           from '../../utils/types';
import { IDataTableHeader } from './DataTable';

interface IDataTableLabelProps {
  item       : IDataTableHeader;
  order      : string;
  orderBy    : string;
  handleSort?: (value: string) => void;
}

export const DataTableLabel = ({ item, order, orderBy, handleSort }: IDataTableLabelProps) => (
  <DataTableLabel.Wrapper
    active        = {orderBy === item.dataKey}
    direction     = {(order === EOrder.Desc ? 'desc' : 'asc') as TableSortLabelOwnProps['direction']}
    onClick       = {(): void => handleSort?.(item?.dataKey ?? '')}
    IconComponent = {ArrowDropDownIcon}
  >
    <span style={{ color: 'white' }}>{item.label}</span>
  </DataTableLabel.Wrapper>
);

DataTableLabel.Wrapper = styled(TableSortLabel)`
  color: white;
`;

  