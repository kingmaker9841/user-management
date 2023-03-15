/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import type {
  ColumnDef,
  PaginationState,
  FilterFn
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel
} from '@tanstack/react-table'
import { styled, useTheme } from '@mui/material/styles'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { green, red, blue, grey } from '@mui/material/colors'
import Pagination from '@mui/material/Pagination'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export enum ActionMode {
  view = 'view',
  edit = 'edit',
  delete = 'delete'
}

interface T {
  pageIndex: number
  pageSize: number
}

interface TableProps {
  data: any[]
  columns: ColumnDef<any>[]
  viewAction?: boolean
  handleClick: (row: any, action: string) => void
  searchString?: string | number
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}

const CustomPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    color: theme.typography.subtitle2.color
  }
}))

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  viewAction,
  handleClick,
  searchString
}) => {
  const theme = useTheme()
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5
    })
  const [globalFilter, setGlobalFilter] = React.useState<string | number>('')

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  React.useEffect(() => {
    if (searchString) setGlobalFilter(searchString)
  }, [searchString])

  const [someData] = React.useState(() => data)
  const table = useReactTable({
    data: someData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(data.length / pageSize) ?? -1,
    state: {
      pagination,
      globalFilter,
      columnVisibility: {
        teamPassword: false,
        firstName: false,
        lastName: false,
        empTeamName: false,
        teamId: false,
        id: false,
        gender: false,
        address: false,
        startsAt: false,
        endsAt: false,
        birthDate: false,
        image: false
      }
    },
    globalFilterFn: fuzzyFilter,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
    debugHeaders: true,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })
  const { getHeaderGroups, getRowModel } = table

  return (
    <>
      <MuiTable>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ color: theme.palette.darker.dark }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell, idx) => {
                if (idx === row.getVisibleCells().length - 1) return
                return (
                  <TableCell
                    key={cell.id}
                    sx={{
                      color: theme.palette.darker.dark,
                      fontSize: theme.typography.subtitle2.fontSize,
                      fontWeight: 400
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}

              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                {getVisibleIcons({ viewAction, handleClick, row })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 4
        }}>
        <CustomPagination
          count={table.getPageCount()}
          shape="rounded"
          color="secondary"
          siblingCount={0}
          boundaryCount={1}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            console.log(value)
            table.setPageIndex(value - 1)
          }}
          sx={{ color: grey[500] }}
        />
        <Typography variant="subtitle1">
          Showing {pageIndex * pageSize + 1} to{' '}
          {(table.getState().pagination.pageIndex + 1) * pageSize} of{' '}
          {table.getPageCount() * pageSize} entries
        </Typography>
      </Box>
    </>
  )
}

const getVisibleIcons = ({ viewAction, handleClick, row }: any) => (
  <>
    {viewAction && (
      <CustomBox
        style={{ background: green[100] }}
        onClick={() =>
          handleClick(row._getAllCellsByColumnId(), ActionMode.view)
        }>
        <VisibilityIcon
          color="success"
          sx={{ width: '20px', height: '20px' }}
        />
      </CustomBox>
    )}
    <CustomBox
      style={{ background: blue[100] }}
      onClick={() =>
        handleClick(row._getAllCellsByColumnId(), ActionMode.edit)
      }>
      <ModeEditIcon color="info" sx={{ width: '20px', height: '20px' }} />
    </CustomBox>
    <CustomBox
      style={{ background: red[100] }}
      onClick={() =>
        handleClick(row._getAllCellsByColumnId(), ActionMode.delete)
      }>
      <DeleteIcon color="error" sx={{ width: '20px', height: '20px' }} />
    </CustomBox>
  </>
)

const CustomBox = styled(Box)(({ theme }: any) => ({
  padding: theme.typography.pxToRem(5),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  cursor: 'pointer'
}))

export default TableComponent
