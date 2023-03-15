/* eslint-disable react/react-in-jsx-scope */
import type { ColumnDef } from '@tanstack/react-table'

export const Columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'employeeId',
    header: 'ID',
    cell: (props: any) => <span>{(props.row.index + 1).toString()}</span>
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: (cell: any) => (
      <span>
        {cell.row.original.firstName + ' ' + cell.row.original.lastName}
      </span>
    ),
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'empTeamName',
    header: 'Team Name',
    cell: (cell: any) => <span>{cell.row.original.teamName}</span>,
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'currentTeam',
    header: 'Current Team',
    cell: (cell: any) => (
      <div style={{ width: 150 }}>
        <span>
          {cell.row.original.teamName
            ? cell.row.original.teamName
            : 'Available'}
        </span>
      </div>
    ),
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Mobile Number',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email Address',
    cell: (cell: any) => (
      <div style={{ width: 150 }}>
        <span>{cell.row.original.emailAddress}</span>
      </div>
    ),
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'billableHours',
    header: 'Billable Hours',
    cell: (cell: any) => (
      <span>{cell.row.original.billableHours}&nbsp;hours/week</span>
    ),
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'address',
    header: 'Address',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'startsAt',
    header: 'Starts At'
  },
  {
    accessorKey: 'endsAt',
    header: 'Ends At'
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date'
  },
  {
    accessorKey: 'image',
    header: 'Image'
  },
  {
    accessorKey: 'actions',
    header: () => <div style={{ textAlign: 'center' }}>Actions</div>
  }
]
