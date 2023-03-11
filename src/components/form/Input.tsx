/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { alpha, styled, useTheme } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { grey } from '@mui/material/colors'

interface InputProps {
  label?: string
  endAdornment?: boolean
  endAdornmentValue?: React.ReactNode | string
  startAdornment?: boolean
  startAdornmentValue?: React.ReactNode | string
  error?: boolean
  helperText?: boolean
  inputProps?: any
  variant?: 'standard' | 'outlined' | 'filled' | undefined
  id?: string
  fullWidth?: boolean
  margin?: 'none' | 'dense' | undefined
  handleChange?: any
  placeholder?: string
  inputLabelColor?:
    | 'secondary'
    | 'primary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined
  inputLabelMargin?: 'dense' | undefined
  inputBgColor?: string | 'light' | 'dark'
  required?: boolean
  readOnly?: boolean
  sx?: Array<() => any | object | boolean> | (() => any) | object
  type?: string
  value?: any
  size?: 'medium' | 'small' | undefined
  formPaddingY?: string
  formPaddingX?: string
  other?: any
}

const InputComponent: React.FC<InputProps> = (props) => {
  const {
    label,
    endAdornment,
    endAdornmentValue,
    startAdornment,
    startAdornmentValue,
    error,
    // helperText,
    inputProps,
    variant,
    id,
    fullWidth,
    margin,
    handleChange,
    placeholder,
    inputLabelColor,
    inputLabelMargin,
    inputBgColor,
    required,
    readOnly,
    type,
    value,
    sx,
    size,
    formPaddingY,
    formPaddingX,
    ...other
  } = props

  const theme = useTheme()

  const BootstrapFormControl = styled(FormControl)(({ theme }) => ({
    '&': {
      width: '100%'
    },
    '& .MuiInputBase-root': {
      borderRadius: 6,
      position: 'relative',
      backgroundColor:
        inputBgColor === 'light'
          ? '#fcfcfb'
          : inputBgColor === 'dark'
          ? grey[100]
          : inputBgColor,
      border: '1px solid #ced4da',
      padding: `${formPaddingX ? formPaddingX : '1.5px'} ${
        formPaddingY ? formPaddingY : '8px'
      }`,
      width: 'auto',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      '&:focus-within': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      },
      '&:hover': {
        borderColor: theme.palette.primary.light
      }
    }
  }))

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3)
    },

    '& .MuiInputBase-input': {
      fontSize: theme.typography.subtitle2.fontSize,
      color: theme.typography.subtitle2.color,
      fontWeight: theme.typography.subtitle2.fontWeight
    }
  }))

  return (
    <BootstrapFormControl variant={variant} margin={margin}>
      {label ? (
        <InputLabel
          shrink
          htmlFor={id}
          color={inputLabelColor}
          sx={{
            color: inputLabelColor
              ? inputLabelColor
              : theme.typography.subtitle2.color,
            fontWeight: 500,
            fontSize: '16px',
            marginLeft: '-14px'
          }}
          margin={inputLabelMargin}>
          {label}
        </InputLabel>
      ) : null}

      <BootstrapInput
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        sx={sx}
        size={size}
        endAdornment={
          endAdornment && (
            <InputAdornment position="end">{endAdornmentValue}</InputAdornment>
          )
        }
        startAdornment={
          startAdornment ? (
            <InputAdornment position="start">
              {startAdornmentValue}
            </InputAdornment>
          ) : null
        }
        // helperText={helperText}
        error={error}
        inputProps={inputProps}
        fullWidth={fullWidth}
        margin={margin}
        onChange={handleChange}
        required={required}
        readOnly={readOnly}
        {...other}
      />
    </BootstrapFormControl>
  )
}

export default InputComponent
