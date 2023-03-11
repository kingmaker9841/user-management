import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTheme } from '@mui/material/styles'

const CustomBox = styled(Box)(() => ({
  height: '7vh',
  boxShadow: '0 3px 12px -2px #cce',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative'
}))

const CustomBackBtn = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '0',
  marginLeft: '20px',
  border: `1px solid ${theme.palette.darker.light}`,
  lineHeight: '0'
}))

interface HeaderProps {
  display: boolean
}

const Header = (props: HeaderProps) => {
  const { display } = props
  const theme = useTheme()

  const BackBtn = () => (
    <CustomBackBtn>
      <ArrowBackIcon style={{ color: theme.palette.darker.main }} />
    </CustomBackBtn>
  )

  return (
    <CustomBox id="header">
      {display && <BackBtn />}
      <Typography variant="body1" color="textSecondary">
        NAVIGATION
      </Typography>
    </CustomBox>
  )
}

export default Header
