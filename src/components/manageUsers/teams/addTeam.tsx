/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import ButtonComponent from '../../form/button/Button'
import Title from './title'
import BreadCrumb from './breadcrumb'
import BasicInformation from './basicInformation'
import Members from './members'
import TeamQR from './teamQR'
import { CurrentUserContext } from '../../../context/selectedUserContext'
import { useLocation, useHistory } from 'react-router-dom'
import {
  getAllEmployees,
  updateEmployeeById,
  updateTeam,
  updateTeamById
} from '../../../helpers/manageUsers'
import { v4 as uuidv4 } from 'uuid'
import SpinnerComponent from '../../../components/form/spinner/Spinner'
import type { EmployeeProps } from '../../../ts/interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SaveBtn = ({ handleClick }: any) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: '0',
        zIndex: 1000,
        background: '#fff'
      }}>
      <Box
        sx={{
          position: 'sticky',
          bottom: '0',
          width: 'calc(100vw - 275px)',
          padding: '15px',
          height: '7vh',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxShadow: '0 -8px 12px -2px #cce',
          overflow: 'hidden'
        }}>
        <ButtonComponent
          variant="outlined"
          size="small"
          sx={{
            background: theme.palette.secondary.main,
            paddingX: '40px',
            borderColor: theme.palette.secondary.main,
            '&:hover': {
              background: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.main
            }
          }}
          handleClick={handleClick}>
          <Typography variant="subtitle2" color="white">
            Save
          </Typography>
        </ButtonComponent>
      </Box>
    </Box>
  )
}

interface AddTeamProps {
  teamName?: string
  teamPassword?: string
  title?: string
  totalManHours?: string | number
  teamMembers?: EmployeeProps[]
  mode?: string
}

const AddTeam: React.FC<AddTeamProps> = ({
  teamName,
  teamPassword,
  title,
  totalManHours,
  teamMembers,
  mode
}) => {
  const theme = useTheme()
  const [state] = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [manHour, setManHour] = React.useState<string | number>('')
  const [selectedMembers, setSelectedMembers] = React.useState<EmployeeProps[]>(
    []
  )
  const location = useLocation()
  const history = useHistory()
  const [employees, setEmployees] = React.useState<EmployeeProps[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  React.useLayoutEffect(() => {
    const getEmployees = async () => {
      setLoading(true)
      const emp: EmployeeProps[] = await getAllEmployees()
      if (Array.isArray(emp) && emp.length) {
        setEmployees(emp)
      }
      setLoading(false)
    }
    getEmployees()
  }, [])

  React.useEffect(() => {
    if (teamName) setName(teamName)
    if (teamPassword) setPassword(teamPassword)
    if (totalManHours) setManHour(totalManHours)
    if (teamMembers) setSelectedMembers(teamMembers)
  }, [teamName, teamPassword, totalManHours, teamMembers])

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value)
  }
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value)
  }

  const getManHour = (val: string) => {
    setManHour(val)
  }

  const getSelected = (users: string[]) => {
    const emp = state.emp || employees
    if (Array.isArray(emp) && emp.length) {
      const selectedEmployees = [] as EmployeeProps[]
      emp.map((employee: EmployeeProps) =>
        users.forEach((id: string) => {
          if (id === employee?.id) {
            selectedEmployees.push(employee)
          }
        })
      )
      setSelectedMembers(selectedEmployees)
    }
  }

  const handleSaveClick = async () => {
    setLoading(true)
    try {
      const currentTeam = state.selectedTeam
      const id = new URLSearchParams(location.search).get('id')
      if (id) {
        await updateTeamById(id, {
          ...currentTeam,
          teamName: name,
          teamMembers: selectedMembers,
          teamPassword: password,
          billableHours:
            typeof manHour === 'string' ? parseInt(manHour) : manHour
        })
        for (let i = 0; i < selectedMembers.length; i++) {
          if (selectedMembers?.[i]?.id) {
            const id = selectedMembers[i].id?.toString()
            if (id) {
              await updateEmployeeById(id, {
                teamName: name
              })
            }
          }
        }
      }
      setLoading(false)
      history.push('/')
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleAddClick = async () => {
    setLoading(true)
    try {
      await updateTeam({
        teamName: name,
        teamMembers: selectedMembers,
        teamPassword: password,
        billableHours:
          typeof manHour === 'string' ? parseInt(manHour) : manHour,
        id: uuidv4()
      })
      for (let i = 0; i < selectedMembers.length; i++) {
        if (selectedMembers?.[i]?.id) {
          const id = selectedMembers[i].id?.toString()
          if (id) {
            await updateEmployeeById(id, {
              teamName: name
            })
          }
        }
      }
      setLoading(false)
      history.push(`/`)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  if (loading) return <SpinnerComponent themeColor="primary" totalCenter />

  return (
    <React.Fragment>
      <BreadCrumb />
      <Title title={title || 'Add Team'} />
      <Paper elevation={0} sx={{ marginTop: theme.typography.pxToRem(25) }}>
        <BasicInformation
          teamName={name}
          teamPassword={password}
          onNameChange={handleNameChange}
          onPasswordChange={handlePasswordChange}
        />
        <Members
          totalManHours={manHour}
          getManHour={getManHour}
          getSelected={getSelected}
          members={selectedMembers
            .filter((m: EmployeeProps) => m.id !== undefined)
            .map((m: EmployeeProps) => m.id!)}
          currentTeam={teamName}
        />
        <TeamQR teamName={name} teamPassword={password} />
      </Paper>
      <SaveBtn
        handleClick={mode === 'edit' ? handleSaveClick : handleAddClick}
      />
    </React.Fragment>
  )
}
export default AddTeam
