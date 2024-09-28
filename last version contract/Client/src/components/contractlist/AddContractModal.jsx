import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, CircularProgress, Typography, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addContract } from '../../Redux/actions/contract';
import { getSuppliers } from '../../Redux/actions/supplier';
import CloseIcon from '@mui/icons-material/Close';

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

const AddContractModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const suppliers = useSelector((state) => state.supplierReducer.listSupplier);
  
  const [formData, setFormData] = useState({
    userId: user?._id || "",
    supplierId: "",
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: user._id,
      }));
    }
    dispatch(getSuppliers());
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSupplierChange = (e) => {
    const selectedSupplier = suppliers.find(supplier => supplier._id === e.target.value);
    setFormData({ ...formData, supplierId: selectedSupplier?._id || '' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, file });
      setUploading(true);
      setError('');
      setTimeout(() => {
        setUploading(false);
      }, 2000); // Simulate upload delay
    } else {
      setError('Please upload a PDF file.');
    }
  };

  const handleFileRemove = () => {
    setFormData({ ...formData, file: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setError('Please upload a PDF file.');
      return;
    }
    setLoading(true);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await dispatch(addContract(form));
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
        <h2>Add New Contract</h2>
        <TextField
          required
          fullWidth
          id="userId"
          name="userId"
          label="User ID"
          margin="normal"
          value={formData.userId}
          readOnly
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="supplierId-label">Supplier</InputLabel>
          <Select
            labelId="supplierId-label"
            id="supplierId"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleSupplierChange}
            label="Supplier"
            required
          >
            {suppliers.map((supplier) => (
              <MenuItem key={supplier._id} value={supplier._id}>
                {supplier.fullname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          fullWidth
          id="name"
          name="name"
          label="Contract Name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="description"
          name="description"
          label="Description"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          margin="normal"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          fullWidth
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          margin="normal"
          value={formData.dueDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {formData.file ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography>{formData.file.name}</Typography>
            <IconButton onClick={handleFileRemove} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
            disabled={uploading}
          >
            {uploading ? (
              <>
                Uploading
                <CircularProgress size={24} sx={{ ml: 2 }} />
              </>
            ) : (
              'Upload File'
            )}
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </Button>
        )}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
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

export default AddContractModal;
