import './docslist.scss'
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { deleteDoc, getDocs } from '../../Redux/actions/docs';
import { DocsColumns } from './DocsColumns.JSX';
import ConfirmationModal from './ConfirmationModal';

const DocsList = () => {

  const dispatch = useDispatch();
  const listDocs = useSelector((state) => state.DocReducer.listDoc);
  const currentUser = useSelector((state) => state.userReducer.user);
  const [data, setData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddDocModal, setOpenAddDocModal] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);

  useEffect(() => {
    dispatch(getDocs());
  }, [dispatch]);

  useEffect(() => {
    if (listDocs && listDocs.length) {
      const formattedDocs = listDocs.map((Doc, index) => ({
        id: Doc._id || index + 1,
        fileName: Doc.fileName, // Note the capitalization here to match the JSON response
        size: Doc.size,
        createdAt: Doc.createdAt,
        name: Doc.contract ? Doc.contract.name : 'No contract name available',
      }));
      setData(formattedDocs);
    }
  }, [listDocs]);

  const handleOpenDeleteModal = (id) => {
    if (!currentUser || currentUser.role !== 'admin') { // Ensure currentUser is checked and role is admin
      return;
    }
    setSelectedDocId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedDocId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedDocId) {
      dispatch(deleteDoc(selectedDocId));
      handleCloseDeleteModal();
    }
  };

  const handleOpenAddDocModal = () => {
    setOpenAddDocModal(true);
  };

  const handleCloseAddDocModal = () => {
    setOpenAddDocModal(false);
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
   <div className="docList">
      <div className="docListTitle">
        Documents
        <Button variant="contained" onClick={handleOpenAddDocModal}>Add New</Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={DocsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <ConfirmationModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
      {/* <AddDocModal
        open={openAddDocModal}
        handleClose={handleCloseAddDocModal}
      /> */}
    </div>
  )
}

export default DocsList
