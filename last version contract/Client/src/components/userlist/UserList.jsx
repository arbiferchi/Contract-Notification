import './userList.scss';
import { userColumns } from './UserColumns';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, current } from "../../Redux/actions/user"; // import current action
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ConfirmationModal from './ConfirmationModal';
import AddUserModal from './AddUserModal';
import toast from 'react-hot-toast';

const UserList = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.userReducer.listUsers);
  const currentUser = useSelector((state) => state.userReducer.user); // Get current user from Redux store
  const [data, setData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(current()); // Fetch current user
    dispatch(getUsers()); // Fetch users list
  }, [dispatch]);

  useEffect(() => {
    console.log("currentUser object:", currentUser);
    if (listUsers && listUsers.length) {
      const formattedUsers = listUsers.map((user, index) => ({
        id: user._id || index + 1, // Ensure each user has a unique id
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        tel: user.tel,
      }));
      setData(formattedUsers);
    }
  }, [listUsers, currentUser]);

  const handleOpenDeleteModal = (id) => {
    if (currentUser.role !== 'admin') {
      return;
    }
    setSelectedUserId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId))
        .then(() => {
          toast.success('User deleted successfully');
          dispatch(getUsers()); // Refresh the users list after deletion
        })
        .catch(() => {
          toast.error('Failed to delete user');
        });
      handleCloseDeleteModal();
    }
  };

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">View</Button>
            </Link>
            {currentUser?.role === 'admin' && (
              <Button variant="outlined" color="error" onClick={() => handleOpenDeleteModal(params.row.id)}>Delete</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userListTitle">
        Add New User
        {currentUser?.role === 'admin' && (
          <Button variant="contained" onClick={handleOpenAddUserModal}>Add New</Button>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
      <AddUserModal
        open={openAddUserModal}
        handleClose={handleCloseAddUserModal}
      />
    </div>
  );
};

export default UserList;
