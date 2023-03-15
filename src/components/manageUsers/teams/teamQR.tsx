import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
// import { FakeQRImg } from '../../../assets/images/index'
import Grid from '@mui/material/Grid'
import ButtonComponent from '../../form/button/Button'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'
import QRCode from 'react-qr-code'

interface TeamQR {
  teamName: string
  teamPassword: string
}

const TeamQR: React.FC<TeamQR> = ({ teamName, teamPassword }) => {
  const theme = useTheme()

  return (
    <Grid container spacing={4}>
      <Grid item xs={2}>
        <Typography variant="body2" textAlign={'right'}>
          Team QR
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={0} sx={{ height: '100%' }} alignItems="center">
          <Grid item xs={2} sx={{ textAlign: 'start' }}>
            <div
              style={{
                height: 'auto',
                margin: '0 auto',
                maxWidth: '150px',
                width: '100%'
              }}>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={JSON.stringify({
                  teamName: teamName,
                  password: teamPassword
                })}
                viewBox={`0 0 256 256`}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              height: '100%',
              display: 'flex'
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
              <ButtonComponent
                variant="outlined"
                size="small"
                sx={{ paddingY: '5px', width: '100%' }}
                startIcon={<PrintIcon />}
                disableElevation>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}>
                  Print
                </Typography>
              </ButtonComponent>

              <ButtonComponent
                variant="outlined"
                size="small"
                sx={{
                  paddingY: '5px',
                  borderColor: theme.palette.success.main,
                  width: '100%',
                  marginTop: theme.typography.pxToRem(10)
                }}
                startIcon={<DownloadIcon color="success" />}>
                <Typography
                  variant="subtitle2"
                  color={theme.palette.success.main}>
                  Download
                </Typography>
              </ButtonComponent>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeamQR
