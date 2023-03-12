/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { getBreadCrumb } from '../../../utils/getBreadCrumb'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person'
import ButtonComponent from '../../form/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { grey } from '@mui/material/colors'
import InputComponent from '../../form/Input'
import SingleSelect from '../../form/SingleSelect'
import Divider from '@mui/material/Divider'
import { Row as TeamRow } from '../../../data/table/teams/rows'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputWithEndAdornment from '../../form/InputWithEndAdornment'

const Title = () => (
  <Box marginBottom={5}>
    <Typography variant="body1">Add Team</Typography>
  </Box>
)

const BreadCrumb = () => {
  const location = useLocation()
  const path = getBreadCrumb(location.pathname)

  return (
    <Box marginY="2px">
      <Typography variant="subtitle2" color="textSecondary">
        Manage Users &gt;&nbsp;{path.join(' > ')}
      </Typography>
    </Box>
  )
}

const ProfileImage = () => {
  const theme = useTheme()
  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={2}
        textAlign="right"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <Box
          bgcolor={grey[200]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '120px',
            width: '120px',
            borderRadius: '60px'
          }}>
          <PersonIcon
            fontSize="large"
            sx={{
              width: '100px',
              height: '100px',
              color: grey[400]
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={0} sx={{ height: '100%' }} alignItems="center">
          <Grid item xs={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
              <Typography variant="body2">Profile Image</Typography>

              <ButtonComponent
                variant="contained"
                size="small"
                color="success"
                sx={{
                  paddingY: '5px',
                  borderColor: theme.palette.success.main,
                  width: '100%',
                  marginTop: theme.typography.pxToRem(10)
                }}
                startIcon={<CloudUploadIcon />}>
                <Typography variant="subtitle2" color={'white'}>
                  Upload Profile Image
                </Typography>
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
        <Grid container />
      </Grid>
    </Grid>
  )
}

const options = [
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
  { label: 'Other', value: 'o' }
]

const BasicInformation = () => {
  const [gender, setGender] = React.useState('')
  const handleGenderChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    options.map((item) =>
      item.value === e.target.value ? setGender(e.target.value) : null
    )
    setGender(e.target.value)
  }
  return (
    <Grid container spacing={4} marginY={2}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'}>
          Basic Information
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid item xs={4}>
            <InputComponent
              label="Name"
              placeholder="Enter Name"
              type="text"
              inputBgColor="dark"
            />
          </Grid>
          <Grid item xs={4}>
            <InputComponent
              label="Middle Name"
              placeholder="Enter Middle Name"
              type="text"
              inputBgColor="dark"
            />
          </Grid>
          <Grid item xs={4}>
            <InputComponent
              label="Surname"
              placeholder="Enter Surname"
              type="text"
              inputBgColor="dark"
            />
          </Grid>

          <Grid item xs={4}>
            <InputComponent
              label="Birth Date"
              placeholder="DD/MM/YYYY"
              type="date"
              inputBgColor="dark"
            />
          </Grid>

          <Grid item xs={4}>
            <SingleSelect
              value={gender}
              options={options}
              placeholder="Choose Gender"
              handleChange={handleGenderChange}
              label="Gender"
              style={{ marginTop: '-12px' }}
            />
          </Grid>
          <Grid item xs={4}>
            <InputComponent
              label="Address"
              placeholder="Enter Address"
              type="text"
              inputBgColor="dark"
            />
          </Grid>

          <Grid item xs={4}>
            <InputComponent
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="text"
              inputBgColor="dark"
            />
          </Grid>
          <Grid item xs={4}>
            <InputComponent
              label="Email Address"
              placeholder="Enter Email Address"
              type="text"
              inputBgColor="dark"
            />
          </Grid>
        </Grid>
        <Divider
          sx={{
            borderWidth: '2px',
            borderColor: grey[300],
            marginTop: '26px',
            marginBottom: '20px'
          }}
          orientation="horizontal"
          flexItem
        />
      </Grid>
    </Grid>
  )
}

const WorkingHours = () => (
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'}>
        Working Hours
      </Typography>
    </Grid>

    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputComponent
            label="Starts At"
            placeholder="HH-MM"
            type="time"
            inputBgColor="dark"
          />
        </Grid>

        <Grid item xs={4}>
          <InputComponent
            label="Ends At"
            placeholder="HH-MM"
            type="time"
            inputBgColor="dark"
          />
        </Grid>
        <Grid item xs={4} />
      </Grid>
      <Divider
        sx={{
          borderWidth: '2px',
          borderColor: grey[300],
          marginTop: '26px',
          marginBottom: '34px'
        }}
        orientation="horizontal"
        flexItem
      />
    </Grid>
  </Grid>
)

const Jobs = () => {
  const [selectedTeam, setSelectedTeam] = React.useState('')
  const [teamOptions, setTeamOptions] = React.useState([])

  const handleTeamChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSelectedTeam(e.target.value)
  }

  React.useEffect(() => {
    if (Array.isArray(TeamRow) && TeamRow.length) {
      const arr = [] as any
      TeamRow.map((team) => {
        arr.push({ label: team.teamName, value: team.teamName })
      })
      setTeamOptions(arr)
    }
  }, [TeamRow])
  return (
    <Grid container spacing={4}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'}>
          Jobs
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputComponent
              label="Job Position"
              placeholder="Enter Job Position"
              type="text"
              inputBgColor="dark"
            />
          </Grid>

          <Grid item xs={4}>
            <SingleSelect
              value={selectedTeam}
              options={teamOptions}
              placeholder="Choose Team"
              handleChange={handleTeamChange}
              label="Team"
              style={{ marginTop: '-12px' }}
            />
          </Grid>
          <Grid item xs={4} />
        </Grid>
        <Divider
          sx={{
            borderWidth: '2px',
            borderColor: grey[300],
            marginTop: '26px',
            marginBottom: '26px'
          }}
          orientation="horizontal"
          flexItem
        />
      </Grid>
    </Grid>
  )
}

const BillableInformation = () => (
  <Grid container spacing={4} sx={{ marginBottom: '40px' }}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'}>
        Billable Hours
      </Typography>
    </Grid>

    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            value="end"
            control={<Checkbox color="default" />}
            label={
              <Typography variant="body2" fontWeight={500}>
                This user is billable
              </Typography>
            }
            labelPlacement="end"
          />
        </Grid>

        <Grid item xs={4}>
          <InputWithEndAdornment
            placeholder="Enter Billable Hours"
            label="Billable Hours"
            endAdornmentValue="Hours"
            endAdornmentBgColor={grey[400]}
            endAdornmentColor={grey[900]}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'flex-end'
          }}>
          <ButtonComponent variant="contained" size="small" color="primary">
            Enter
          </ButtonComponent>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

const SaveBtn = () => {
  const theme = useTheme()
  return (
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
        zIndex: 100,
        background: '#fff',
        overflow: 'hidden'
      }}>
      <ButtonComponent
        variant="outlined"
        size="small"
        sx={{
          background: theme.palette.secondary.main,
          paddingX: '40px',
          borderColor: theme.palette.secondary.main
        }}>
        <Typography variant="subtitle2" color="white">
          Save
        </Typography>
      </ButtonComponent>
    </Box>
  )
}

const EmployeeAInformation = () => {
  const theme = useTheme()
  return (
    <Paper
      id="add-employee"
      elevation={0}
      sx={{ marginTop: theme.typography.pxToRem(65) }}>
      <ProfileImage />
      <BasicInformation />
      <WorkingHours />
      <Jobs />
      <BillableInformation />
    </Paper>
  )
}

const AddEmployee = () => (
  <Box sx={{ paddingLeft: '1rem', overflowX: 'clip' }}>
    <BreadCrumb />
    <Title />
    <EmployeeAInformation />
    <SaveBtn />
  </Box>
)

export default AddEmployee
