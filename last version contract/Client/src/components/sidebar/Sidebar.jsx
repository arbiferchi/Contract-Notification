import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useState } from "react";

import {useDispatch} from 'react-redux';

import {logout} from '../../Redux/actions/user'
import { toast } from 'react-hot-toast';



const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/'); // Redirect to the home page
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo"  style={{ textDecoration: "none" }}>Contract Alert</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/user" style={{ textDecoration: "none" }}>
          <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
          </li>
          </Link>

          <Link to="/contract" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Contracts</span>
            </li>
          </Link>

          <Link to="/suppliers" style={{ textDecoration: "none" }}>
          <li>
              <CreditCardIcon className="icon" />
              <span>Suppliers</span>
          </li>
          </Link>

          <Link to="/document">
          <li>
            <LocalShippingIcon className="icon" />
              <span>Documents</span>
          </li>
          </Link>

          <p className="title">Alerts</p>

          <Link to="/alerts">
          <li>
              <InsertChartIcon className="icon" />
              <span>Alert</span>
          </li>
          </Link>

          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">USER</p>

          <Link to = "/profile">
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>

          <Link to="#">
          <li onClick={openModal}>
          <ExitToAppIcon className="icon" />
          <span>Logout</span>
        </li>
        </Link>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  handleLogout();
                  closeModal();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
