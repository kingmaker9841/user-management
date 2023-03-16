/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material'

interface InputWithEndAdornmentProps {
  placeholder?: string
  inputHeight?: string | number
  label?: string
  endAdornmentValue?: string | number
  endAdornmentBgColor?: string
  endAdornmentColor?: string
  value?: string | number
  onChange?: (
    // eslint-disable-next-line autofix/no-unused-vars
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  readOnly?: boolean
}

export default function InputWithEndAdornment(
  props: InputWithEndAdornmentProps
) {
  const {
    placeholder,
    inputHeight,
    label,
    endAdornmentValue,
    endAdornmentBgColor,
    endAdornmentColor,
    value,
    onChange,
    readOnly
  } = props
  const theme = useTheme()
  return (
    <>
      {label ? (
        <Typography variant="subtitle2" marginBottom={2}>
          {label}
        </Typography>
      ) : null}
      <Box
        component="form"
        sx={{
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          width: 'auto',
          border: '1px solid #ced4da',
          height: inputHeight || '2rem',
          background: grey[100],
          borderRadius: '5px'
        }}>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: theme.typography.subtitle2 }}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search google maps' }}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        <Box
          sx={{
            height: '100%',
            paddingX: '10px',
            display: 'flex',
            alignItems: 'center',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            fontSize: theme.typography.subtitle2,
            backgroundColor: endAdornmentBgColor || theme.palette.primary.main
          }}>
          <Typography
            variant="subtitle2"
            sx={{ color: endAdornmentColor || '#fff !important' }}>
            {endAdornmentValue}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
