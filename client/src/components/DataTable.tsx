import { ReactNode } from 'react';
import styled        from 'styled-components';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

export interface IDataTableCell {
  value  : ReactNode;
  align? : TAlignValues;
  title? : string;
}

type TAlignValues = 'left' | 'right' | 'center' | 'justify';

export interface IDataTableHeader {
  label  : string;
  align? : TAlignValues;
}

export type TDataTableRow = Array<IDataTableCell>;

export interface IDataTableProps {
  rows          : TDataTableRow[];
  rowsPerPage?  : number;
  title?        : string;
  padding?      : string;
  headers?      : IDataTableHeader[];
  loading?      : boolean;
  noResultText? : string;
}


export const DataTable = ({
  rows,
  rowsPerPage = 2,
  title,
  padding,
  headers,
  loading,
  noResultText = 'no data'
}: IDataTableProps) => {
  return (
    <DataTable.Wrapper padding={padding}>
      <Table>
        {headers && (
          <TableHead>
            <DataTable.Headers>
              {headers.map((header: IDataTableHeader, headerIndex: number) => (
                <TableCell
                  key={headerIndex}
                  component="th"
                  scope="row"
                  align={header.align ?? 'left'}
                  style={{ width: 'auto' }}
                >
                  {header.label}
                </TableCell>
              ))}
            </DataTable.Headers>
          </TableHead>
        )}

        {!loading && !!rows.length && (
          <TableBody>
            {rows.map((row: TDataTableRow, rowIndex: number) => (
              <DataTable.Row key={rowIndex}>
                {row.map((cell: IDataTableCell, cellIndex: number) => (
                  <TableCell key={cellIndex} align={cell.align ?? 'left'}>
                    {cell.value}
                  </TableCell>
                ))}
              </DataTable.Row>
            ))}
          </TableBody>
        )}
      </Table>

      {!rows.length && noResultText && !loading ? (
        <DataTable.NoResult>{noResultText}</DataTable.NoResult>
      ) : (
        <>
          {loading && (
            <DataTable.Loading>
              <CircularProgress />
            </DataTable.Loading>
          )}
        </>
      )}

      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={0}
        onPageChange={(a) => console.log('a')}
        onRowsPerPageChange={(b) => console.log('b')}
      // onPageChange={handleChangePage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </DataTable.Wrapper>
  );

}

DataTable.Wrapper = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding || '30px'};
`;

DataTable.Loading = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  padding         : 48px 0;
`;

DataTable.NoResult = styled.div`
  display         : flex;
  justify-content : center;
  align-items     : center;
  padding         : 25px 0;
  color           : grey;
  font-weight     : 600;
`;

DataTable.Headers = styled(TableRow)`
  background-color: black;

  & th {
    font-weight : 600;
    color       : white;
  }
`;

DataTable.Row = styled(TableRow)`
  &:nth-of-type(even) {
    background: #f5f5f5;
  };

  &:last-child td, &:last-child th: {
    border: 0;
  };
`;
