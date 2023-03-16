import { Box } from '@mui/material'
import React from 'react'

const PageNotFound = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <h1>404</h1>
      <span>Page not found</span>
    </Box>
  </Box>
)

export default PageNotFound
