/* eslint-disable autofix/no-unused-vars */
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import ButtonComponent from '../button/Button'

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  title?: string
  description: React.ReactNode | string
  handleDelete: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  border: '0px'
}

const DeleteModalComponent: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  title,
  description,
  handleDelete
}) => (
  <div>
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Typography id="modal-modal-title" variant="body1">
            {title}
          </Typography>
          <Box onClick={handleClose}>
            <CloseIcon color="error" />
          </Box>
        </Box>
        <Typography
          variant="subtitle1"
          id="modal-modal-description"
          sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box id="modal-buttons" sx={{ marginTop: '1rem' }}>
          <ButtonComponent
            variant="contained"
            color="error"
            handleClick={handleDelete}>
            Delete
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            color="primary"
            handleClick={handleClose}
            sx={{ marginLeft: '10px' }}>
            Cancel
          </ButtonComponent>
        </Box>
      </Box>
    </Modal>
  </div>
)

export default DeleteModalComponent
