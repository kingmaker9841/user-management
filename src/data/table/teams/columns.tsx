import type { ColumnDef } from '@tanstack/react-table'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Column: ColumnDef<any, any>[] = [
  {
    accessorKey: 'teamName',
    header: 'Team Name'
  },
  {
    accessorKey: 'members',
    header: 'Members',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'qrDetails',
    header: 'QR Details'
  },
  {
    accessorKey: 'totalManHours',
    header: 'Total Man Hours'
  },
  {
    accessorKey: 'actions',
    header: () => (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div style={{ textAlign: 'center' }}>Actions</div>
    ),
    cell: (row) => (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div>{row.renderValue()}</div>
    )
  }
]
