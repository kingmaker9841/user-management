import React from 'react'
import Sidebar from './sidebar'
import Header from './header'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

const MainContainer = styled(Container)(() => ({
  background: grey[50],
  width: 'calc(100vw - 260px) !important',
  height: 'auto',
  minHeight: 'calc(100vh - 7vh)',
  marginTop: '7vh',
  marginRight: 'inherit !important',
  padding: '10px 15px 10px 15px',
  maxWidth: '1920px'
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseLayout = ({ children }: any) => (
  <>
    <Sidebar />
    <Header display={false} />
    <MainContainer
      disableGutters
      maxWidth={false}
      id="main-container"
      sx={{ mb: '5rem', pl: '2rem' }}>
      {children}
    </MainContainer>
  </>
)

export default BaseLayout
