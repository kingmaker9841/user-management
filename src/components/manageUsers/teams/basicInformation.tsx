/* eslint-disable autofix/no-unused-vars */
import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputComponent from '../../form/input/Input'
import Grid from '@mui/material/Grid'
import { grey } from '@mui/material/colors'

interface BasicInfoProps {
  teamName?: string
  teamPassword?: string
  onNameChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onPasswordChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const BasicInformation: React.FC<BasicInfoProps> = ({
  teamName,
  teamPassword,
  onNameChange,
  onPasswordChange
}) => (
  <Grid container spacing={4}>
    <Grid item xs={2}>
      <Typography variant="body2" textAlign={'right'} mt={'-10px'}>
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
            value={teamName}
            handleChange={onNameChange}
          />
        </Grid>

        <Grid item xs={4}>
          <InputComponent
            label="Team Password"
            placeholder="Enter Team Password"
            type="password"
            inputBgColor="dark"
            value={teamPassword}
            handleChange={onPasswordChange}
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

export default BasicInformation
