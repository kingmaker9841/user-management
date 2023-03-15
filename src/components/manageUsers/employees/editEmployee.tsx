/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import AddEmployee from './addEmployee'
import { useLocation } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { employeeURL } from '../../../config/urls'
import { CurrentUserContext } from '../../../context/selectedUserContext'
import SpinnerComponent from '../../../components/form/spinner/Spinner'

const EditEmployee = () => {
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  const {
    state: { data: currentEmployee, error }
  }: any = useFetch(`${employeeURL}/${id}`)

  const [, setstate] = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    if (currentEmployee) {
      setstate((state: any) => ({
        ...state,
        selectedEmployee: currentEmployee
      }))
    }
  }, [])

  if (error) return <>...</>
  if (!currentEmployee)
    return <SpinnerComponent themeColor="primary" totalCenter />

  const {
    firstName,
    lastName,
    surname,
    birthDate,
    gender,
    address,
    phoneNumber,
    emailAddress,
    startsAt,
    endsAt,
    designation,
    teamName,
    billableHours,
    image
  } = currentEmployee
  return (
    <AddEmployee
      {...{
        firstName,
        lastName,
        surname,
        birthDate,
        gender,
        address,
        phoneNumber,
        emailAddress,
        startsAt,
        endsAt,
        designation,
        teamName,
        billableHours,
        image,
        mode: 'edit'
      }}
    />
  )
}

export default EditEmployee
