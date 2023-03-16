/* eslint-disable autofix/no-unused-vars */
import React from 'react'
import { Avatar, Badge, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation, useHistory } from 'react-router-dom'
import { getBreadCrumb } from '../../../utils/getBreadCrumb'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import PersonIcon from '@mui/icons-material/Person'
import ButtonComponent from '../../form/button/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { green, grey } from '@mui/material/colors'
import InputComponent from '../../form/input/Input'
import SingleSelect from '../../form/select/SingleSelect'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputWithEndAdornment from '../../form/input/InputWithEndAdornment'
import {
  getAllTeams,
  updateEmployee,
  updateEmployeeById,
  uploadImage
} from '../../../helpers/manageUsers'
import { CurrentUserContext } from '../../../context/selectedUserContext'
// import { withSnackbar } from '../../../components/form/Snackbar'
import { v4 as uuidv4 } from 'uuid'
import SpinnerComponent from '../../../components/form/spinner/Spinner'
import { toBase64 } from '../../../utils/base64'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'
import type { SelectChangeEvent } from '@mui/material'
import type {
  WorkingHoursProps,
  BasicInformationProps,
  JobsProps,
  BillableInformationProps,
  AddEmployeeProps,
  TeamsProps
} from '../../../ts/interfaces'

const Title = ({ title }: { title: string }) => (
  <Box marginBottom={5}>
    <Typography variant="body1">{title}</Typography>
  </Box>
)

const BreadCrumb = () => {
  const location = useLocation()
  const path = getBreadCrumb(location.pathname)

  return (
    <Box marginY="2px">
      <Typography variant="subtitle2" color="textSecondary">
        Manage Users &gt;&nbsp;{path.join('   >   ')}
      </Typography>
    </Box>
  )
}

interface FileHandleProps {
  // eslint-disable-next-line autofix/no-unused-vars
  base64: string
  fileUploaded: File | undefined
}
interface ProfileImageProps {
  // eslint-disable-next-line autofix/no-unused-vars
  handleFile: ({ base64, fileUploaded }: FileHandleProps) => void
  empImage?: string
}

const ProfileImage = ({ handleFile, empImage }: ProfileImageProps) => {
  const theme = useTheme()
  const [selectedFile, setSelectedFile] = React.useState<string>()

  React.useEffect(() => {
    if (empImage) setSelectedFile(empImage)
  }, [empImage])
  const handleBtnClick = () => {
    const el = document.getElementById('profile-image-upload')
    if (el) {
      el.click()
    }
  }
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target?.files?.[0]
    try {
      const base64 = (await toBase64(fileUploaded)) as string
      setSelectedFile(base64)
      handleFile({ base64, fileUploaded })
    } catch (err) {
      console.error(err)
    }
  }

  const displayAvatar = () => {
    if (selectedFile) {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ cursor: 'pointer' }}
          badgeContent={
            <Box
              sx={{
                zIndex: 1500,
                background: green[800],
                width: '30px',
                height: '30px',
                borderRadius: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff'
              }}>
              <ModeEditOutlineRoundedIcon
                sx={{
                  color: '#fff',
                  width: '15px'
                }}
              />
            </Box>
          }
          onClick={handleBtnClick}>
          <Avatar
            sx={{ width: '150px', height: '150px' }}
            alt="Travis Howard"
            src={selectedFile}
          />
        </Badge>
      )
    }
    return (
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
    )
  }
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
        {displayAvatar()}
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={0} sx={{ height: '100%' }} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={2}>
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
                startIcon={<CloudUploadIcon />}
                handleClick={handleBtnClick}>
                <Typography variant="subtitle2" color={'white'}>
                  Upload Profile Image
                </Typography>
              </ButtonComponent>
              <input
                type="file"
                onChange={handleChange}
                style={{ display: 'none' }}
                id="profile-image-upload"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container />
      </Grid>
    </Grid>
  )
}

const options = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' }
]

const BasicInformation = (props: BasicInformationProps) => {
  const {
    firstName,
    lastName,
    surname,
    birthDate,
    gender,
    address,
    phoneNumber,
    emailAddress,
    handleFirstNameChange,
    handleLastNameChange,
    handleSurnameChange,
    handleBirthDateChange,
    handleGenderChange,
    handleAddressChange,
    handlePhoneNumberChange,
    handleEmailAddressChange
  } = props

  return (
    <Grid container spacing={4} marginY={2}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'} mt={'-10px'}>
          Basic Information
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Name"
              placeholder="Enter Name"
              type="text"
              inputBgColor="dark"
              value={firstName}
              handleChange={handleFirstNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Middle Name"
              placeholder="Enter Middle Name"
              type="text"
              inputBgColor="dark"
              value={lastName}
              handleChange={handleLastNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Surname"
              placeholder="Enter Surname"
              type="text"
              inputBgColor="dark"
              value={surname}
              handleChange={handleSurnameChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Birth Date"
              placeholder="DD/MM/YYYY"
              type="date"
              inputBgColor="dark"
              value={birthDate}
              handleChange={handleBirthDateChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <SingleSelect
              value={gender}
              options={options}
              placeholder="Choose Gender"
              handleChange={handleGenderChange}
              label="Gender"
              style={{ marginTop: '-12px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Address"
              placeholder="Enter Address"
              type="text"
              inputBgColor="dark"
              value={address}
              handleChange={handleAddressChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="text"
              inputBgColor="dark"
              value={phoneNumber}
              handleChange={handlePhoneNumberChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Email Address"
              placeholder="Enter Email Address"
              type="email"
              inputBgColor="dark"
              value={emailAddress}
              handleChange={handleEmailAddressChange}
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

const WorkingHours = ({
  startsAt,
  endsAt,
  handleStartsAtChange,
  handleEndsAtChange
}: WorkingHoursProps) => (
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'} mt={'-10px'}>
        Working Hours
      </Typography>
    </Grid>

    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InputComponent
            label="Starts At"
            placeholder="HH-MM"
            type="time"
            inputBgColor="dark"
            value={startsAt}
            handleChange={handleStartsAtChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InputComponent
            label="Ends At"
            placeholder="HH-MM"
            type="time"
            inputBgColor="dark"
            value={endsAt}
            handleChange={handleEndsAtChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} />
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

type TeamsOptionProps = {
  label: string
  value: string
}

const Jobs = ({
  designation,
  handleTeamChange,
  selectedTeam,
  teams,
  handleDesignationChange
}: JobsProps) => {
  const [teamOptions, setTeamOptions] = React.useState<TeamsOptionProps[]>([])

  React.useEffect(() => {
    if (Array.isArray(teams) && teams.length) {
      const arr = teams.map((team) => ({
        label: team.teamName,
        value: team.teamName
      }))
      setTeamOptions(arr)
    }
  }, [teams])

  return (
    <Grid container spacing={4}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'} mt={'-10px'}>
          Jobs
        </Typography>
      </Grid>

      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              label="Job Position"
              placeholder="Enter Job Position"
              type="text"
              inputBgColor="dark"
              value={designation}
              handleChange={handleDesignationChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <SingleSelect
              value={selectedTeam}
              options={teamOptions}
              placeholder="Choose Team"
              handleChange={handleTeamChange}
              label="Team"
              style={{ marginTop: '-12px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} />
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

const BillableInformation = ({
  billableHours,
  handleBillableHoursChange
}: BillableInformationProps) => (
  <Grid container spacing={4} sx={{ marginBottom: '40px' }}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'} mt={'10px'}>
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
            value={billableHours}
            onChange={handleBillableHoursChange}
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

const SaveBtn = ({
  handleSaveClick
}: {
  handleSaveClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        bottom: '0',
        background: '#fff',
        width: 'calc(100vw - 275px)',
        position: 'absolute',
        right: '0',
        overflowX: 'hidden',
        boxShadow: '0 -8px 12px -2px #cce'
      }}>
      <Box
        sx={{
          position: 'fixed',
          background: '#fff',
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
            marginLeft: '40px',
            borderColor: theme.palette.secondary.main,
            '&:hover': {
              background: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.main
            }
          }}
          handleClick={handleSaveClick}>
          <Typography variant="subtitle2" color="white">
            Save
          </Typography>
        </ButtonComponent>
      </Box>
    </Box>
  )
}

const AddEmployee = (props: AddEmployeeProps) => {
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
    image,
    mode,
    title
  } = props
  const theme = useTheme()
  const history = useHistory()
  const [state] = React.useContext(CurrentUserContext)
  const [sex, setSex] = React.useState('')
  const [fName, setFname] = React.useState('')
  const [lName, setLname] = React.useState('')
  const [sName, setSname] = React.useState('')
  const [birthDateState, setBirthDateState] = React.useState<string | number>(
    ''
  )
  const [addressState, setAddressState] = React.useState('')
  const [phoneNumberState, setPhoneNumberState] = React.useState<
    string | number
  >('')
  const [emailAddressState, setEmailAddressState] = React.useState('')
  const [startsAtState, setStartsAtState] = React.useState<string | number>('')
  const [endsAtState, setEndsAtState] = React.useState<string | number>('')
  const [designationState, setdesignationState] = React.useState('')
  const [teamNameState, setTeamNameState] = React.useState('')
  const [billableHoursState, setBillableHoursState] = React.useState<
    string | number
  >('')
  const [empImage, setEmpImage] = React.useState('')
  const [, setSelectedTeam] = React.useState('')
  const [allTeams, setAllTeams] = React.useState<TeamsProps>()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [selectedFile, setSelectedFile] = React.useState<File>()
  React.useLayoutEffect(() => {
    const getTeams = async () => {
      setLoading(true)
      const result = await getAllTeams()
      if (result) setAllTeams(result)
      setLoading(false)
    }
    getTeams()
  }, [])

  React.useEffect(() => {
    if (firstName) setFname(firstName)
    if (lastName) setLname(lastName)
    if (surname) setSname(surname)
    if (birthDate) setBirthDateState(birthDate)
    if (address) setAddressState(address)
    if (phoneNumber) setPhoneNumberState(phoneNumber)
    if (emailAddress) setEmailAddressState(emailAddress)
    if (startsAt) setStartsAtState(startsAt)
    if (endsAt) setEndsAtState(endsAt)
    if (designation) setdesignationState(designation)
    if (teamName) setTeamNameState(teamName)
    if (billableHours) setBillableHoursState(billableHours)
    if (teamName) setSelectedTeam(teamName)
    if (gender) setSex(gender)
    if (image) setEmpImage(image)
  }, [])

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    options.map((item) =>
      item.value === e.target.value ? setSex(e.target.value) : null
    )
    setSex(e.target.value)
  }

  const handleTeamChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setTeamNameState(e.target.value)
    setSelectedTeam(e.target.value)
  }

  const handleFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFname(e.target.value)
  const handleLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setLname(e.target.value)
  const handleSurnameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setSname(e.target.value)
  const handleBirthDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setBirthDateState(e.target.value)
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setAddressState(e.target.value)
  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPhoneNumberState(e.target.value)
  const handleEmailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEmailAddressState(e.target.value)
  const handleStartsAtChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setStartsAtState(e.target.value)
  const handleEndsAtChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEndsAtState(e.target.value)
  const handleDesignationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setdesignationState(e.target.value)
  }
  const handleBillableHoursChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setBillableHoursState(e.target.value)

  const handleFile = ({ base64, fileUploaded }: FileHandleProps) => {
    setEmpImage(base64)
    setSelectedFile(fileUploaded)
  }

  const handleSaveClick = async () => {
    setLoading(true)
    const currentEmployee = state.selectedEmployee
    const id = new URLSearchParams(location.search).get('id')
    try {
      if (id) {
        let upload
        if (selectedFile) {
          upload = await uploadImage(selectedFile)
        }
        await updateEmployeeById(id, {
          ...currentEmployee,
          firstName: fName,
          lastName: lName,
          surname: sName,
          birthDate: birthDateState,
          gender: sex,
          address: addressState,
          phoneNumber: phoneNumberState,
          emailAddress: emailAddressState,
          startsAt: startsAtState,
          endsAt: endsAtState,
          designation: designationState,
          teamName: teamNameState,
          billableHours: billableHoursState,
          ...(upload && { image: upload.url })
        })
        setLoading(true)
        history.push('/')
      }
    } catch (err) {
      console.error(err)
      setLoading(true)
    }
  }

  const handleAddClick = async () => {
    setLoading(true)
    try {
      let upload
      if (selectedFile) {
        upload = await uploadImage(selectedFile)
      }
      await updateEmployee({
        id: uuidv4().toString(),
        firstName: fName,
        lastName: lName,
        surname: sName,
        birthDate: birthDateState,
        gender: sex,
        address: addressState,
        phoneNumber: phoneNumberState,
        emailAddress: emailAddressState,
        startsAt: startsAtState,
        endsAt: endsAtState,
        designation: designationState,
        teamName: teamNameState,
        billableHours: billableHoursState,
        ...(upload && { image: upload.url })
      })
      setLoading(false)
      history.push('/')
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  if (loading) return <SpinnerComponent themeColor="primary" totalCenter />

  return (
    <Box sx={{ paddingLeft: '1rem', overflowX: 'clip' }}>
      <BreadCrumb />
      <Title title={title || 'Add Employee'} />
      <Paper
        id="add-employee"
        elevation={0}
        sx={{ marginTop: theme.typography.pxToRem(65) }}>
        <ProfileImage handleFile={handleFile} empImage={empImage} />
        <BasicInformation
          firstName={fName}
          lastName={lName}
          surname={sName}
          birthDate={birthDateState}
          gender={sex}
          address={addressState}
          phoneNumber={phoneNumberState}
          emailAddress={emailAddressState}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          handleSurnameChange={handleSurnameChange}
          handleBirthDateChange={handleBirthDateChange}
          handleGenderChange={handleGenderChange}
          handleAddressChange={handleAddressChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
          handleEmailAddressChange={handleEmailAddressChange}
        />
        <WorkingHours
          startsAt={startsAtState}
          endsAt={endsAtState}
          handleEndsAtChange={handleEndsAtChange}
          handleStartsAtChange={handleStartsAtChange}
        />
        <Jobs
          designation={designationState}
          teamName={teamNameState}
          handleTeamChange={handleTeamChange}
          handleDesignationChange={handleDesignationChange}
          selectedTeam={teamNameState}
          teams={allTeams}
        />
        <BillableInformation
          billableHours={billableHoursState}
          handleBillableHoursChange={handleBillableHoursChange}
        />
      </Paper>
      <SaveBtn
        handleSaveClick={mode === 'edit' ? handleSaveClick : handleAddClick}
      />
    </Box>
  )
}

export default AddEmployee
