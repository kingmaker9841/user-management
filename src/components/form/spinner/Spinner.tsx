import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom'

interface SpinnerProps {
  color?: string
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
    | undefined
  totalCenter?: boolean
  thickness?: number
}

const center = {
  top: '50%',
  left: '50%',
  position: 'fixed',
  transform: 'translate(-50%, -50%)'
}

const SpinnerComponent: React.FC<SpinnerProps> = ({
  themeColor,
  color,
  totalCenter,
  thickness,
  ...props
}) => {
  if (totalCenter) {
    return ReactDOM.createPortal(
      <CircularProgress
        {...props}
        color={themeColor}
        thickness={thickness}
        sx={{ color: `${color}`, ...center, zIndex: 1500 }}
      />,
      document.body
    )
  }
  return (
    <CircularProgress
      {...props}
      color={themeColor}
      thickness={thickness}
      sx={{ color: `${color}` }}
    />
  )
}

export default SpinnerComponent
