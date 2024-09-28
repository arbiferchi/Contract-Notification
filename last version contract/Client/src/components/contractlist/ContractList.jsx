import './contractlist.scss';
import { ContractColumns } from './ContractColumns';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContract, getContracts } from "../../Redux/actions/contract";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AddContractModal from './AddContractModal';
import ConfirmationModal from './ConfirmationModal';

const ContractList = () => {
  const dispatch = useDispatch();
  const listContracts = useSelector((state) => state.contractReducer.listContract);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [data, setData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddContractModal, setOpenAddContractModal] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);

  useEffect(() => {
    dispatch(getContracts());
  }, [dispatch]);

  useEffect(() => {
    if (listContracts && listContracts.length) {
      const formattedContracts = listContracts.map((contract, index) => ({
        id: contract._id || index + 1,
        user: contract.user ? `${contract.user.firstName || 'N/A'} ${contract.user.lastName || 'N/A'}` : 'Unknown User',
        supplier: contract.supplier ? contract.supplier.fullname || 'Unknown Supplier' : 'Unknown Supplier',
        name: contract.name,
        description: contract.description,
        startDate: new Date(contract.startDate).toLocaleDateString(),
        dueDate: new Date(contract.dueDate).toLocaleDateString(),
      }));
      setData(formattedContracts);
    }
  }, [listContracts]);

  const handleOpenDeleteModal = (id) => {
    if (!currentUser || currentUser.role !== 'admin') { // Ensure currentUser is checked and role is admin
      return;
    }
    setSelectedContractId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedContractId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedContractId) {
      dispatch(deleteContract(selectedContractId));
      handleCloseDeleteModal();
    }
  };

  const handleOpenAddUserModal = () => {
    setOpenAddContractModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddContractModal(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">View</Button>
            </Link>
            {currentUser && currentUser.role === 'admin' && (
              <Button variant="outlined" color="error" onClick={() => handleOpenDeleteModal(params.row.id)}>Delete</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="contractList">
      <div className="contractListTitle">
        Add New Contract
        <Button variant="contained" onClick={handleOpenAddUserModal}>Add New</Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={ContractColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
      <AddContractModal
        open={openAddContractModal}
        handleClose={handleCloseAddUserModal}
      />
    </div>
  );
}

export default ContractList;
