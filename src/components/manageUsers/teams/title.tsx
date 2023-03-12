import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({ title }) => (
  <Box marginBottom={5}>
    <Typography variant="body1">{title}</Typography>
  </Box>
)

export default Title
