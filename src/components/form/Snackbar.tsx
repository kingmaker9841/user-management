/* eslint-disable react/display-name */
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import Alert from '@mui/material/Alert'

type AlertColor = 'error' | 'warning' | 'info' | 'success | undefined'

interface MessageProps {
  message: string
  severity: AlertColor
  duration: number
}

export const withSnackbar = (WrappedComponent: React.FC) => (props: any) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("I'm a custom snackbar")
  const [duration, setDuration] = useState(2000)
  const [severity, setSeverity] = useState('success') as any

  const showMessage = ({
    message,
    severity,
    duration = 2000
  }: MessageProps) => {
    setMessage(message)
    setSeverity(severity)
    setDuration(duration)
    setOpen(true)
  }

  const handleClose = ({ reason }: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <WrappedComponent {...props} snackbarShowMessage={showMessage} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        autoHideDuration={duration}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}>
        <Alert variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
