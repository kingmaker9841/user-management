/* eslint-disable autofix/no-unused-vars */
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import ButtonComponent from '../../form/Button'
import Title from './title'
import BreadCrumb from './breadcrumb'
import BasicInformation from './basicInformation'
import Members from './members'
import TeamQR from './teamQR'

export const SaveBtn = () => {
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
            borderColor: theme.palette.secondary.main
          }}>
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
}

const AddTeam: React.FC<AddTeamProps> = ({ teamName, teamPassword, title }) => {
  const theme = useTheme()
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (teamName) setName(teamName)
    if (teamPassword) setPassword(teamPassword)
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
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
        <Members />
        <TeamQR />
      </Paper>
      <SaveBtn />
    </React.Fragment>
  )
}
export default AddTeam
