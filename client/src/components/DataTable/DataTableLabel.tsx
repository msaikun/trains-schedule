import { TableSortLabel } from '@mui/material';
import ArrowDropDownIcon  from '@mui/icons-material/ArrowDropDown';
import styled from 'styled-components';
import { EOrder } from '../../utils/types';
import { IDataTableHeader } from './DataTable';

interface IDataTableLabelProps {
  item       : IDataTableHeader;
  order      : EOrder;
  orderBy    : string;
  handleSort?: (value: string) => void;
}

export const DataTableLabel = ({ item, order, orderBy, handleSort }: IDataTableLabelProps) => (
  <DataTableLabel.Wrapper
    active        = {orderBy === item.dataKey}
    direction     = {order}
    onClick       = {(): void => handleSort?.(item?.dataKey ?? '')}
    IconComponent = {ArrowDropDownIcon}
  >
    <span style={{ color: 'white' }}>{item.label}</span>
  </DataTableLabel.Wrapper>
);

DataTableLabel.Wrapper = styled(TableSortLabel)`
  color: white;
`;

  