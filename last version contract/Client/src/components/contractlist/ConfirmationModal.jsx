import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ConfirmationModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Confirm Deletion
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Are you sure you want to delete this contract?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Box>
  </Modal>
  </>
  )
}

export default ConfirmationModal;