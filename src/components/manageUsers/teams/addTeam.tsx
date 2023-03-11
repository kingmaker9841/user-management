import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { getBreadCrumb } from '../../../utils/getBreadCrumb'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import InputComponent from '../../form/Input'
import MultiSelectComponent from '../../form/MultiSelect'
import { FakeQRImg } from '../../../assets/images/index'
import Grid from '@mui/material/Grid'
import InputWithEndAdornment from '../../form/InputWithEndAdornment'
import ButtonComponent from '../../form/Button'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'
import { createPortal } from 'react-dom'
import { grey } from '@mui/material/colors'

const Title = () => (
  <Box>
    <Typography variant="body1">Add Team</Typography>
  </Box>
)

const BreadCrumb = () => {
  const location = useLocation()
  const path = getBreadCrumb(location.pathname)

  return (
    <Box marginY="2px">
      <Typography variant="subtitle2" color="textSecondary">
        {path.join(' > ')}
      </Typography>
    </Box>
  )
}

const BasicInfo = () => (
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'}>
        Basic Information
      </Typography>
    </Grid>

    <Grid item xs={10}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputComponent
            label="Team Name"
            placeholder="Enter Team Name"
            type="text"
            inputBgColor="dark"
          />
        </Grid>

        <Grid item xs={4}>
          <InputComponent
            label="Team Password"
            placeholder="Enter Team Password"
            type="password"
            inputBgColor="dark"
          />
        </Grid>
        <Grid item xs={4} />
      </Grid>
      <Divider
        sx={{
          borderWidth: '2px',
          borderColor: grey[300],
          marginTop: '26px'
        }}
        orientation="horizontal"
        flexItem
      />
    </Grid>
  </Grid>
)
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

const Members = () => {
  const theme = useTheme()
  return (
    <>
      <Grid container spacing={4} sx={{ marginY: theme.typography.pxToRem(0) }}>
        <Grid item xs={2}>
          <Typography variant="body2" textAlign={'right'}>
            Members
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MultiSelectComponent
                names={names}
                inputSelectSize="36px"
                inputBgColor="dark"
                label="Team Members"
                placeholder="Select Team"
              />
            </Grid>

            <Grid item xs={4} />

            <Grid item xs={4}>
              <Box marginTop={2}>
                <InputWithEndAdornment
                  placeholder="Billable Hours"
                  label="Billable Hours"
                  endAdornmentValue="Hours"
                  endAdornmentBgColor={theme.palette.primary.main}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider
            sx={{
              borderWidth: '2px',
              borderColor: grey[300],
              marginY: '26px'
            }}
            orientation="horizontal"
            // flexItem
          />
        </Grid>
      </Grid>
    </>
  )
}

const TeamQR = () => {
  const theme = useTheme()

  return (
    <Grid container spacing={4}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'}>
          Team QR
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={0} sx={{ height: '100%' }} alignItems="center">
          <Grid item xs={2} sx={{ textAlign: 'start' }}>
            <img src={FakeQRImg} alt="QR image" style={{ maxWidth: '150px' }} />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              height: '100%',
              display: 'flex'
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
              <ButtonComponent
                variant="outlined"
                size="small"
                sx={{ paddingY: '5px', width: '100%' }}
                startIcon={<PrintIcon />}
                disableElevation>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}>
                  Print
                </Typography>
              </ButtonComponent>

              <ButtonComponent
                variant="outlined"
                size="small"
                sx={{
                  paddingY: '5px',
                  borderColor: theme.palette.success.main,
                  width: '100%',
                  marginTop: theme.typography.pxToRem(10)
                }}
                startIcon={<DownloadIcon color="success" />}>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.success.main}>
                  Download
                </Typography>
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const SaveBtn = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        width: 'calc(100vw - 275px)',
        marginLeft: '250px',
        padding: '15px',
        height: '7vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxShadow: '0 -8px 12px -2px #cce'
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

const TeamInformation = () => {
  const theme = useTheme()
  return (
    <Paper elevation={0} sx={{ marginTop: theme.typography.pxToRem(25) }}>
      <BasicInfo />
      <Members />
      <TeamQR />
    </Paper>
  )
}

const AddTeam = () => (
  <React.Fragment>
    <BreadCrumb />
    <Title />
    <TeamInformation />
    {createPortal(<SaveBtn />, document.body)}
    {/* <SaveBtn /> */}
  </React.Fragment>
)

export default AddTeam
