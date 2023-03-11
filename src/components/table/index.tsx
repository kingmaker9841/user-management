/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Box,
  // Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingFn
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  sortingFns
} from '@tanstack/react-table'
import { useTheme, styled } from '@mui/material/styles'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { green, red, blue } from '@mui/material/colors'
import Pagination from '@mui/material/Pagination'

import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem, compareItems } from '@tanstack/match-sorter-utils'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

interface TableProps {
  data: any[]
  columns: ColumnDef<any>[]
  viewAction?: boolean
  // eslint-disable-next-line autofix/no-unused-vars
  page?: (page: number) => void
  pageCount?: number
}

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

// eslint-disable-next-line autofix/no-unused-vars
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// eslint-disable-next-line autofix/no-unused-vars
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  viewAction,
  page,
  pageCount
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    pageCount: pageCount || -1,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel()
  })
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    pageCount: pageCount || -1,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel()
  })
  const theme = useTheme()
  const [paginationPage, setPaginationPage] = React.useState(1)

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'teamName') {
      if (table.getState().sorting[0]?.id !== 'teamName') {
        table.setSorting([{ id: 'teamName', desc: false }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    currentPage: number
  ) => {
    setPaginationPage(currentPage === 0 ? 1 : currentPage)
    page?.(currentPage === 0 ? 1 : currentPage)
  }

  return (
    // <Paper elevation={2} style={{ padding: '1rem 0px' }}>
    <>
      <MuiTable>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{ color: theme.palette.darker.main }}>
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
                      color: theme.palette.darker.main,
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
                {viewAction && (
                  <Box
                    sx={{
                      background: green[100],
                      padding: theme.typography.pxToRem(5),
                      borderRadius: '5px'
                    }}>
                    <VisibilityIcon
                      color="success"
                      sx={{ width: '20px', height: '20px' }}
                    />
                  </Box>
                )}
                <Box
                  sx={{
                    background: blue[100],
                    padding: theme.typography.pxToRem(5),
                    borderRadius: '5px'
                  }}>
                  <ModeEditIcon
                    color="info"
                    sx={{ width: '20px', height: '20px' }}
                  />
                </Box>
                <Box
                  sx={{
                    background: red[100],
                    padding: theme.typography.pxToRem(5),
                    borderRadius: '5px'
                  }}>
                  <DeleteIcon
                    color="error"
                    sx={{ width: '20px', height: '20px' }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      {pageCount && page && (
        <StyledPagination
          count={pageCount}
          page={paginationPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </>
    // </Paper>
  )
}

export default TableComponent
