import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'
import { getBreadCrumb } from '../../../utils/getBreadCrumb'

const BreadCrumb = () => {
  const location = useLocation()
  const path = getBreadCrumb(location.pathname)

  return (
    <Box marginY="2px">
      <Typography variant="subtitle2" color="textSecondary">
        Manage Users &gt;&nbsp;{path.join(' > ')}
      </Typography>
    </Box>
  )
}

export default BreadCrumb
