/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import AddTeam from './addTeam'
import { useLocation } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { teamsURL } from '../../../config/urls'
import { CurrentUserContext } from '../../../context/selectedUserContext'
import SpinnerComponent from '../../../components/form/spinner/Spinner'

const EditTeam = () => {
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  const {
    state: { data: currentTeam, error }
  }: any = useFetch(`${teamsURL}/${id}`)

  const [, setstate] = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (currentTeam) {
      setstate((state: any) => ({
        ...state,
        selectedTeam: currentTeam
      }))
    }
  }, [])

  if (error) return <>...</>
  if (!currentTeam) return <SpinnerComponent totalCenter themeColor="primary" />

  return (
    <AddTeam
      teamName={currentTeam['teamName']}
      teamPassword={currentTeam['teamPassword']}
      title="Edit Team"
      totalManHours={currentTeam['billableHours']?.toString()}
      teamMembers={currentTeam['members'] || currentTeam['teamMembers']}
      mode="edit"
    />
  )
}

export default EditTeam
