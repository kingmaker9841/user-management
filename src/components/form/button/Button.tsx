import React from 'react'
import Button from '@mui/material/Button'
import type { SxProps } from '@mui/material'

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
  sx?: SxProps
  textColor?: string
  handleClick?: // eslint-disable-next-line autofix/no-unused-vars
  ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
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
