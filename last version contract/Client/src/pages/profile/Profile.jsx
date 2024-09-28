import "./Profile.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { current, editUser } from "../../Redux/actions/user";
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const [newUserInfo, setNewUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    tel: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (user) {
      setNewUserInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
        tel: user.tel || '',
        // Add other fields as needed
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(user._id, newUserInfo)); // Pass user._id and newUserInfo to editUser action
  };

  useEffect(() => {
    if (!user) {
      dispatch(current()); // Fetch updated user data
    }
  }, [dispatch, user]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{newUserInfo.firstName} {newUserInfo.lastName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{newUserInfo.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{newUserInfo.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{newUserInfo.tel}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Edit Profile</h1>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit} // Handle form submission
            >
              <div>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={newUserInfo.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={newUserInfo.lastName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  value={newUserInfo.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={newUserInfo.password}
                  onChange={handleChange}
                />
                <TextField
                  disabled
                  id="role"
                  name="role"
                  label="Role"
                  value={newUserInfo.role}
                />
              </div>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
