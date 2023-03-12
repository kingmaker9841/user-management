import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import React from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const CustomBox = styled(Box)(({ theme }) => ({
  background: theme.palette.darker.dark,
  height: '100vh',
  minWidth: theme.typography.pxToRem(250),
  position: 'absolute',
  top: '0',
  left: '0',
  maxWidth: theme.typography.pxToRem(250),
  zIndex: '100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const Sidebar = () => (
  <Container
    maxWidth="sm"
    disableGutters
    id="sidebar"
    sx={{ position: 'fixed', top: '0', zIndex: 1000 }}>
    <CustomBox>
      <Typography variant="body1" color="textSecondary">
        SIDEBAR
      </Typography>
    </CustomBox>
  </Container>
)

export default Sidebar
