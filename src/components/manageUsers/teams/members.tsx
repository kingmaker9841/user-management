import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import MultiSelectComponent from '../../form/MultiSelect'
import Grid from '@mui/material/Grid'
import InputWithEndAdornment from '../../form/InputWithEndAdornment'
import { grey } from '@mui/material/colors'
import { Row } from '../../../data/table/employees/rows'

const Members = () => {
  const theme = useTheme()
  const [names, setNames] = React.useState([] as string[])

  React.useEffect(() => {
    if (Array.isArray(Row) && Row.length) {
      const newArr = [] as string[]
      Row.map((item) => {
        newArr.push(item.fullName)
      })
      setNames(newArr)
    }
  }, [Row])

  return (
    <>
      <Grid container spacing={4} sx={{ marginY: theme.typography.pxToRem(0) }}>
        <Grid item xs={2}>
          <Typography variant="body2" textAlign={'right'}>
            Members
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MultiSelectComponent
                names={names}
                inputSelectSize="36px"
                inputBgColor="dark"
                label="Team Members"
                placeholder="Select Team"
              />
            </Grid>

            <Grid item xs={4} />

            <Grid item xs={4}>
              <Box marginTop={2}>
                <InputWithEndAdornment
                  placeholder="Billable Hours"
                  label="Billable Hours"
                  endAdornmentValue="Hours"
                  endAdornmentBgColor={theme.palette.primary.main}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider
            sx={{
              borderWidth: '2px',
              borderColor: grey[300],
              marginY: '26px'
            }}
            orientation="horizontal"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Members
