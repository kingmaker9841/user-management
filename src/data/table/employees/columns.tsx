/* eslint-disable react/react-in-jsx-scope */
export const Columns = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name'
  },
  {
    accessorKey: 'currentTeam',
    header: 'Current Team'
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Mobile Number'
  },
  {
    accessorKey: 'emailAddress',
    header: 'Email Address'
  },
  {
    accessorKey: 'designation',
    header: 'Designation'
  },
  {
    accessorKey: 'billableHours',
    header: 'Billable Hours'
  },
  {
    accessorKey: 'actions',
    header: () => <div style={{ textAlign: 'center' }}>Actions</div>
  }
]
