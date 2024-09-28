import './supplierlist.scss';
import { supplierColumns } from './SupplierColumns';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier, getSuppliers } from '../../Redux/actions/supplier';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ConfirmationModal from './ConfirmationModal';
import AddSupplierModal from './AddSupplierModal';
import ViewSupplierModal from './ViewSupplierModal';


const SupplierList = () => {
  const dispatch = useDispatch();
  const listSupplier = useSelector((state) => state.supplierReducer.listSupplier);
  const currentUser = useSelector((state) => state.userReducer.user); // Get current user from Redux store
  const [data, setData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddSupplierModal, setOpenAddSupplierModal] = useState(false);
  const [openViewSupplierModal, setOpenViewSupplierModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (listSupplier && listSupplier.length) {
      const formattedSuppliers = listSupplier.map((supplier, index) => ({
        id: supplier._id || index + 1,
        fullname: supplier.fullname,
        email: supplier.email,
        tel: supplier.tel,
      }));
      setData(formattedSuppliers);
    }
  }, [listSupplier]);

  const handleOpenDeleteModal = (id) => {
    if (currentUser.role !== 'admin') {
      return;
    }
    setSelectedSupplierId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedSupplierId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedSupplierId) {
      dispatch(deleteSupplier(selectedSupplierId));
      handleCloseDeleteModal();
    }
  };

  const handleOpenAddSupplierModal = () => {
    setOpenAddSupplierModal(true);
  };

  const handleCloseAddSupplierModal = () => {
    setOpenAddSupplierModal(false);
  };

  const handleOpen = (id) => {
    setSelectedSupplierId(id);
    setOpenViewSupplierModal(true);
  };

  const handleClose = () => {
    setOpenViewSupplierModal(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <Button variant="outlined" color="primary" onClick={() => handleOpen(params.row._id)}>view</Button>
            {currentUser?.role === 'admin' && (
            <Button variant="outlined" color="error" onClick={() => handleOpenDeleteModal(params.row.id)}>Delete</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="supplierList">
      <div className="supplierListTitle">
        Add New Supplier
        <Button variant="contained" onClick={handleOpenAddSupplierModal}>Add New</Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={supplierColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
      <AddSupplierModal
        open={openAddSupplierModal}
        handleClose={handleCloseAddSupplierModal}
      />
      <ViewSupplierModal open={openViewSupplierModal} handleClose={handleClose} supplierId={selectedSupplierId}/>
    </div>
  )
}

export default SupplierList;
