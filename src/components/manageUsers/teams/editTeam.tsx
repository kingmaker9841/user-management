/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrentUserContext } from '../../../context/selectedUserContext'
import React from 'react'
import AddTeam from './addTeam'

const EditTeam = () => {
  const [state] = React.useContext(CurrentUserContext)
  console.log({
    state,
    currentRow: state.selectedUser,
    me: {},
    value: state.selectedUser?.map((item: any) =>
      item.getValue('teamName')
    )?.[0]
  })
  return (
    <AddTeam
      teamName={
        state.selectedUser?.map((item: any) =>
          item.getValue('teamName')
        )?.[0] || ''
      }
      teamPassword=""
      title="Edit Team"
    />
  )
}

export default EditTeam
