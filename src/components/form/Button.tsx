import React from 'react'
import Button from '@mui/material/Button'

interface ButtonProps {
  variant?: 'text' | 'outlined' | 'contained' | undefined
  startIcon?: React.ReactNode | undefined
  size?: 'small' | 'medium' | 'large'
  children?: React.ReactNode | undefined
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
  disableElevation?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: Array<() => any | object | boolean> | (() => any) | object
  textColor?: string
  handleClick?: () => void
}

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const {
    variant,
    startIcon,
    size,
    color,
    disableElevation,
    sx,
    children,
    textColor,
    handleClick
  } = props

  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      size={size}
      color={color}
      disableElevation={disableElevation}
      sx={sx}
      style={{ color: `${textColor} !important` }}
      onClick={handleClick}>
      {children}
    </Button>
  )
}

export default ButtonComponent
