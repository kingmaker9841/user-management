/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import GroupsIcon from '@mui/icons-material/Groups'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import InputComponent from '../form/input/Input'
import SearchIcon from '@mui/icons-material/Search'
import ButtonComponent from '../form/button/Button'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'
import TableComponent, { ActionMode } from '../table'
import { Column as TeamColumn } from '../../data/table/teams/columns'
import { Columns as EmployeeColumn } from '../../data/table/employees/columns'
import { useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../context/selectedUserContext'
import { lsGet, lsGetTeams } from '../../utils/localStorateAction'
import useFetch from '../../hooks/useFetch'
import { teamsURL, employeeURL } from '../../config/urls'
import DeleteModalComponent from '../form/modal/DeleteModal'
import { deleteEmployeeById, deleteTeamById } from '../../helpers/manageUsers'
import ProfileModalComponent from '../form/modal/ProfileModal'
import Slider from '@mui/material/Slider'
import SpinnerComponent from '../form/spinner/Spinner'

interface StatsProps {
  numberOfTeams: number
  numberOfEmployees: number
}

export const getTeams = () => {
  let teams = lsGetTeams()
  if (!teams.id) {
    teams = JSON.parse(teams)
  }
  return teams
}

export const getEmployees = () => {
  let employees = lsGet('employees')
  if (!employees.id) {
    employees = JSON.parse(employees)
  }
  return employees
}

const Title = () => (
  <Box marginTop="12px">
    <Typography variant="body1">Manage Users</Typography>
  </Box>
)

const Stats: React.FC<StatsProps> = ({ numberOfTeams, numberOfEmployees }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start'
      }}>
      <Box
        sx={{ background: theme.palette.primary.main }}
        width={theme.typography.pxToRem(230)}
        height="auto"
        display="flex"
        marginTop={'12px'}
        borderRadius="5px">
        <Box
          paddingY={'8px'}
          paddingX={'15px'}
          width="100%"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Typography variant="subtitle2" color={'#ffff'}>
              Teams
            </Typography>
            <Typography variant="h3" color={'#ffff'}>
              {numberOfTeams}
            </Typography>
          </Box>
          <Box
            sx={{
              background: theme.palette.primary.light,
              border: `1px solid ${theme.palette.primary.light}`,
              paddingX: '4px',
              borderRadius: '5px'
            }}>
            <Typography variant="subtitle2" color={'#ffff'}>
              <GroupsIcon />
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Employees */}
      <Box
        sx={{ background: theme.palette.secondary.main }}
        width={theme.typography.pxToRem(230)}
        height="auto"
        display="flex"
        marginTop={'12px'}
        marginLeft={'12px'}
        borderRadius="5px">
        <Box
          paddingY={'8px'}
          paddingX={'15px'}
          width="100%"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Typography variant="subtitle2" color={'#ffff'}>
              Employees
            </Typography>
            <Typography variant="h3" color={'#ffff'}>
              {numberOfEmployees}
            </Typography>
          </Box>
          <Box
            sx={{
              background: theme.palette.secondary.light,
              border: `1px solid ${theme.palette.secondary.light}`,
              paddingX: '4px',
              borderRadius: '5px'
            }}>
            <Typography variant="subtitle2" color={'#ffff'}>
              <GroupsIcon />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const UserTab = ({ getCurrentTab }: any) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    getCurrentTab(newValue)
  }

  return (
    <Box marginTop={'24px'}>
      <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          selectionFollowsFocus
          TabIndicatorProps={{
            sx: {
              height: '3px'
            }
          }}>
          <Tab sx={{ fontSize: '16px' }} label="Teams" value={0} />
          <Tab
            sx={{ marginLeft: '20px', fontSize: '16px' }}
            label="Employees"
            value={1}
          />
        </Tabs>
      </Box>
    </Box>
  )
}
const marks = [
  {
    value: 5,
    label: '5 Hours'
  },
  {
    value: 10000,
    label: '10000 Hours'
  }
]

const CustomSlider = styled(Slider)(() => ({
  '& .MuiSlider-markLabel': {
    whiteSpace: 'pre-wrap'
  }
}))

const SearchAndFilter = ({
  currentTab,
  onChange,
  value: initialValue
}: any) => {
  const history = useHistory()
  const handleClick = () => {
    if (currentTab === 0) history.push('/teams/add-team')
    if (currentTab === 1) history.push('/employee/add-employee')
  }

  const [value, setValue] = React.useState(initialValue)
  const [rangeValue, setRangeValue] = React.useState([2000, 5000])
  const [openFilter, setOpenFilter] = React.useState(false)
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, 100)

    return () => clearTimeout(timeout)
  }, [value])

  const minDistance = 10

  const valuetext = (value: number) => `${value} Hours`
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return
    }
    if (activeThumb === 0) {
      setRangeValue([
        Math.min(newValue[0], rangeValue[1] - minDistance),
        rangeValue[1]
      ])
    } else {
      setRangeValue([
        rangeValue[0],
        Math.max(newValue[1], rangeValue[0] + minDistance)
      ])
    }
    // setRangeValue(newValue as number[])
  }
  const handleFilterModalClick = () => setOpenFilter(!openFilter)

  return (
    <Grid container spacing={1} marginTop={'12px'}>
      <Grid item xs={2}>
        <InputComponent
          variant="outlined"
          placeholder="Search Item"
          startAdornment={true}
          startAdornmentValue={<SearchIcon style={{ height: '17px' }} />}
          fullWidth={true}
          inputBgColor="light"
          value={value}
          handleChange={(e: { target: { value: any } }) =>
            setValue(e.target.value)
          }
        />
      </Grid>
      <Grid item xs={2}>
        {currentTab === 0 ? (
          <Box sx={{ position: 'relative' }}>
            <ButtonComponent
              variant="outlined"
              startIcon={<FilterAltIcon />}
              size="small"
              sx={{ paddingY: '5px' }}
              handleClick={handleFilterModalClick}>
              <Typography variant="subtitle2">Filter</Typography>
            </ButtonComponent>
            {openFilter && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 40,
                  left: 0,
                  p: 3,
                  zIndex: 100,
                  backgroundColor: '#fff',
                  boxShadow: '0 -8px 12px -2px #cce',
                  px: 6
                }}>
                <Typography variant="body2">Filter</Typography>
                <Typography variant="subtitle1">
                  Choose man hour range
                </Typography>
                <Box sx={{ width: 300 }}>
                  <CustomSlider
                    aria-label="Custom marks"
                    defaultValue={[500, 3000]}
                    getAriaValueText={valuetext}
                    step={5}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    marks={marks}
                    value={rangeValue}
                    color="secondary"
                    min={5}
                    max={10000}
                    disableSwap
                  />
                </Box>

                <Grid container spacing={0} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <ButtonComponent
                      variant="contained"
                      color="secondary"
                      disableElevation>
                      Apply
                    </ButtonComponent>
                  </Grid>
                  <Grid item xs={4}>
                    <ButtonComponent color="error">
                      Clear Filter
                    </ButtonComponent>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        ) : null}
      </Grid>

      <Grid item xs={6} />
      <Grid item xs={2} textAlign="right">
        <ButtonComponent
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          size="small"
          disableElevation
          sx={{ paddingY: '5px' }}
          handleClick={handleClick}>
          <Typography variant="subtitle2" color="white">
            Add {currentTab === 0 ? 'Team' : 'Employee'}
          </Typography>
        </ButtonComponent>
      </Grid>
    </Grid>
  )
}

// eslint-disable-next-line react/prop-types
const UsersTable = ({
  currentTab,
  teamsData,
  userContext,
  employeesData,
  searchString
}: any) => {
  if (currentTab === 0) {
    return (
      <TeamsTable
        teamsData={teamsData}
        userContext={userContext}
        searchString={searchString}
      />
    )
  } else {
    return (
      <EmployeeTable
        employeesData={employeesData}
        searchString={searchString}
      />
    )
  }
}

const TeamsTable = ({ teamsData, searchString }: any) => {
  const history = useHistory()
  const [state, setState] = React.useContext(CurrentUserContext)
  const [openModal, setOpenModal] = React.useState(false)
  const [description, setDescription] = React.useState<React.ReactNode>()
  const handleDelete = async () => {
    const user = state.selectedUser
    try {
      const deleteUser = await deleteTeamById(user.id)
      if (deleteUser) {
        setOpenModal(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = (row: any, mode: string) => {
    const getByColId = (columnId: string) => row?.[columnId]?.getValue()
    const user = {
      teamName: getByColId('teamName'),
      teamPassword: getByColId('teamPassword'),
      id: getByColId('id'),
      members: getByColId('members'),
      totalManHours: getByColId('totalManHours')
    }
    console.log({ user })
    switch (mode) {
      case ActionMode.edit:
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        history.push(`/teams/edit-team?id=${user.id}`)
        break
      case ActionMode.view:
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        history.push('/teams/view-team')
        break
      case ActionMode.delete:
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        setOpenModal(true)
        setDescription(() => (
          <span>
            Are you sure you want to delete <b>{user.teamName}</b> from the
            list?
          </span>
        ))
        break
      default:
        break
    }
  }

  teamsData = teamsData?.map((team: any) => ({
    teamName: team.teamName,
    members: team.teamMembers,
    totalManHours: team.billableHours,
    teamPassword: team.teamPassword,
    id: team.id
  }))
  return (
    <>
      <TableComponent
        viewAction={false}
        columns={TeamColumn}
        data={teamsData}
        handleClick={handleClick}
        searchString={searchString}
      />
      <DeleteModalComponent
        title="Delete Team"
        description={description}
        handleClose={() => setOpenModal(false)}
        isOpen={openModal}
        handleDelete={handleDelete}
      />
    </>
  )
}

const EmployeeTable = ({ employeesData, searchString }: any) => {
  const history = useHistory()
  const [state, setState] = React.useContext(CurrentUserContext)
  const [openModal, setOpenModal] = React.useState(false)
  const [openProfileModal, setOpenProfileModal] = React.useState(false)
  const [description, setDescription] = React.useState<React.ReactNode>()

  const handleDelete = async () => {
    const user = state.selectedUser
    try {
      const deleteUser = await deleteEmployeeById(user.id)
      if (deleteUser) {
        setOpenModal(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = (row: any, mode: string) => {
    const getByColId = (columnId: string) => row?.[columnId]?.getValue()
    const user = {
      firstName: getByColId('firstName'),
      lastName: getByColId('lastName'),
      id: getByColId('id'),
      fullName: getByColId('firstName') + ' ' + getByColId('lastName'),
      teamName: getByColId('empTeamName'),
      currentTeam: getByColId('teamName'),
      phoneNumber: getByColId('phoneNumber'),
      emailAddress: getByColId('emailAddress'),
      designation: getByColId('designation'),
      billableHours: getByColId('billableHours'),
      gender: getByColId('gender'),
      address: getByColId('address'),
      startsAt: getByColId('startsAt'),
      endsAt: getByColId('endsAt'),
      birthDate: getByColId('birthDate'),
      image: getByColId('image')
    }

    switch (mode) {
      case ActionMode.edit:
        console.log({ user })
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        history.push(`/employee/edit-employee?id=${user.id}`)
        break
      case ActionMode.view:
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        setOpenProfileModal(true)
        // history.push('/employee/view-employee')
        break
      case ActionMode.delete:
        setState((state: any) => ({
          ...state,
          selectedUser: user
        }))
        setOpenModal(true)
        setDescription(() => (
          <span>
            Are you sure you want to delete <b>{user.fullName}</b> from the
            list?
          </span>
        ))
        break
      default:
        break
    }
  }

  return (
    <>
      <TableComponent
        viewAction={true}
        columns={EmployeeColumn}
        data={employeesData}
        handleClick={handleClick}
        searchString={searchString}
      />
      <DeleteModalComponent
        title="Delete Employee"
        description={description}
        handleClose={() => setOpenModal(false)}
        isOpen={openModal}
        handleDelete={handleDelete}
      />
      <ProfileModalComponent
        title="Employee Information"
        isOpen={openProfileModal}
        handleClose={() => setOpenProfileModal(false)}
        userDetails={state.selectedUser}
      />
    </>
  )
}
const ManageUsers = () => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [state, setState] = React.useContext(CurrentUserContext)
  const {
    state: { data: teamsData, error: teamsError }
  }: any = useFetch(teamsURL)
  const {
    state: { data: employeesData, error: employeeError }
  }: any = useFetch(employeeURL)
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    if (!state.teams) {
      setState((state: any) => ({
        ...state,
        teams: teamsData
      }))
    }
    if (!state.employees) {
      setState((state: any) => ({
        ...state,
        employees: employeesData
      }))
    }
  }, [])

  const getCurrentTab = (val: number) => {
    setCurrentTab(val)
  }

  if (teamsError || employeeError) return <div>...</div>
  if (!teamsData || !employeesData)
    return <SpinnerComponent themeColor="primary" totalCenter />

  return (
    <React.Fragment>
      <Title />
      <Stats
        numberOfTeams={teamsData?.length}
        numberOfEmployees={employeesData?.length}
      />
      <UserTab getCurrentTab={getCurrentTab} />
      <SearchAndFilter currentTab={currentTab} onChange={setSearchValue} />
      <UsersTable
        currentTab={currentTab}
        teamsData={teamsData}
        userContext={state}
        employeesData={employeesData}
        searchString={searchValue}
      />
    </React.Fragment>
  )
}

export default ManageUsers
