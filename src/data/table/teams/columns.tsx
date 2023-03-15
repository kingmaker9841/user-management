/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import type { ColumnDef } from '@tanstack/react-table'
import QRCode from 'react-qr-code'

export const Column: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'teamName',
    header: 'Team Name',
    cell: (cell) => (
      <div
        style={{
          minWidth: 100,
          maxWidth: 200,
          width: 200
        }}>
        {cell.row.original.teamName}
      </div>
    )
  },
  {
    accessorKey: 'members',
    header: () => <div style={{ textAlign: 'left', width: 300 }}>Members</div>,
    cell: (cell) => {
      const member = cell.row.original.members
      let newMembers = member?.map((m: any) => m.firstName + ' ' + m.lastName)
      const len = newMembers.length
      if (Array.isArray(newMembers) && len > 2) {
        newMembers = newMembers.slice(0, 2).join(', ')
        return (
          <div style={{ width: 300 }}>
            {newMembers}&nbsp;
            <b>&&nbsp;{len - 2}&nbsp;more</b>
          </div>
        )
      }
      return newMembers.join(', ')
    },
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'qrDetails',
    header: () => <div style={{ textAlign: 'center' }}>QR Details</div>,
    cell: (row) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div
          style={{
            height: 'auto',
            margin: '0 auto',
            maxWidth: 25,
            width: '100%',
            textAlign: 'center'
          }}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={JSON.stringify({
              teamName: row.row.original.teamName,
              password: row.row.original.teamPassword
            })}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    )
  },
  {
    accessorKey: 'totalManHours',
    header: 'Total Man Hours',
    filterFn: 'fuzzy'
  },
  {
    accessorKey: 'teamPassword',
    header: 'Team Password'
  },
  {
    accessorKey: 'actions',
    header: () => <div style={{ textAlign: 'center' }}>Actions</div>,
    cell: (row) => <div>{row.renderValue()}</div>
  }
]
