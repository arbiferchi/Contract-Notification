/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Box, TextField, Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from '../../Redux/actions/user';


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

const AddUserModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user', // Default value
    tel: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(register(formData));
      handleClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Error handling is done by toast in the action
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <h2>Add New User</h2>
        <TextField
          required
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          disabled
          fullWidth
          id="role"
          name="role"
          label="Role"
          margin="normal"
          value={formData.role}
        />
        <TextField
          required
          fullWidth
          id="tel"
          name="tel"
          label="Telephone"
          margin="normal"
          value={formData.tel}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
