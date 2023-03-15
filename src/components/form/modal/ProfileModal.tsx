import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import { green, grey, red } from '@mui/material/colors'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'
import ButtonComponent from '../button/Button'
import { Avatar, Badge, Divider, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  title?: string
  handleEdit?: () => void
  userDetails?: any
}

const style = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
}

const displayAvatar = ({ userDetails }: any) => {
  console.log({ userDetails })
  if (userDetails?.image) {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ cursor: 'pointer' }}
        badgeContent={
          <Box
            sx={{
              zIndex: 1500,
              background: green[800],
              width: '30px',
              height: '30px',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff'
            }}>
            <ModeEditOutlineRoundedIcon
              sx={{
                color: '#fff',
                width: '15px'
              }}
            />
          </Box>
        }>
        <Avatar
          sx={{ width: '150px', height: '150px' }}
          alt="Travis Howard"
          src={userDetails?.image}
        />
      </Badge>
    )
  }
  return (
    <Box
      bgcolor={grey[200]}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '120px',
        width: '120px',
        borderRadius: '60px'
      }}>
      <PersonIcon
        fontSize="large"
        sx={{
          width: '100px',
          height: '100px',
          color: grey[400]
        }}
      />
    </Box>
  )
}

const ProfileModalComponent: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  userDetails,
  // handleEdit,
  title
}) => {
  const history = useHistory()
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            background: 'rgba(0,0,0,0)'
          }
        }}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <ButtonComponent
              variant="contained"
              handleClick={handleClose}
              startIcon={
                <CloseIcon color="error" sx={{ margin: '0 !important' }} />
              }
              disableElevation
              sx={{
                background: red[100],
                padding: '0 !important',
                minWidth: '30px',
                display: 'flex',
                justifyContent: 'center',
                '& .MuiButton-startIcon': {
                  margin: '0 !important'
                },
                '&:hover': {
                  background: red[200]
                }
              }}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            {displayAvatar({ userDetails })}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">{userDetails?.fullName}</Typography>
              <Typography variant="subtitle2">
                {userDetails?.emailAddress}
              </Typography>
              <ButtonComponent
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: '30px',
                  height: '30px !important'
                }}>
                Employee
              </ButtonComponent>
              <Divider
                sx={{
                  borderWidth: '2px',
                  borderColor: grey[300],
                  marginY: 2
                }}
              />
            </Box>

            <Box>
              <Grid container columnSpacing={6} rowSpacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Designation</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.designation}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Contact</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Address</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.address}
                  </Typography>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  borderWidth: '2px',
                  borderColor: grey[300],
                  marginY: 2
                }}
              />
            </Box>

            <Box>
              <Grid container columnSpacing={6} rowSpacing={3}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Start Date</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.startDate || '12/02/2021'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Role</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.role || 'Staff'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Billable Status</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.billableStatus
                      ? 'User is billable'
                      : 'User is not billable'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Billable Hours</Typography>
                  <Typography variant="subtitle1">
                    {userDetails?.billableHours}
                  </Typography>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  borderWidth: '2px',
                  borderColor: grey[300],
                  marginY: 2
                }}
              />
            </Box>

            <Grid container>
              <Grid item xs={12}>
                <ButtonComponent
                  startIcon={<ModeEditOutlineRoundedIcon />}
                  color="secondary"
                  variant="contained"
                  disableElevation
                  sx={{
                    width: '100%'
                  }}
                  handleClick={() =>
                    history.push(`/employee/edit-employee?id=${userDetails.id}`)
                  }>
                  Edit Profile
                </ButtonComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

{
  /* 
                <image />
                <imageDetails />
                <divider />
                <Gridwithemployeeinof />
                <Gridwithemployeeinof />
                <button />
              */
}
export default ProfileModalComponent
