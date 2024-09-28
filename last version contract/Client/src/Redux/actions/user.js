import {  FAIL_USER, GET_USERS, LOAD_USER, LOGOUT_USER, SUCCESS_USER, CURRENT_USER } from "../actionTypes/user";
import axios from "axios";
import toast from "react-hot-toast";



// Get all users
export const getUsers = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        const result = await axios.get("/api/users", config);
        dispatch({ type: GET_USERS, payload: { listUsers: result.data.data } });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response });
    }
};

//REGISTER

export const register = (newUser) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        await toast.promise(
            axios.post('/api/users/register', newUser),
            {
                pending: 'Registering...',
                success: 'Registration successful!',
                error: 'Registration failed!'
            }
        ).then(result => {
            dispatch({ type: SUCCESS_USER, payload: result.data });
            return Promise.resolve(result.data); // Resolve the promise on success
        }).catch(error => {
            throw error; // Throw the error to be caught in the catch block
        });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
        return Promise.reject(error.response.data.errors); // Reject the promise on error
    }
};

export const login = (user) => async (dispatch) => {
    dispatch({type: LOAD_USER});
    try {
        let result = await axios.post("/api/users/login", user);
        dispatch({type: SUCCESS_USER, payload: result.data});
        toast.success('Welcome!');
        return Promise.resolve(result.data); // Resolve the promise on success
    } catch (error) {
        toast.error("Bad credentials, try again");
        dispatch({type: FAIL_USER, payload: error.response.data.errors});
        return Promise.reject(error.response.data.errors); // Reject the promise on error
    }
};


//LOGOUT
export const logout = () => async (dispatch) => {
    dispatch({type: LOGOUT_USER});
    }


// Current user
export const current = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };
        let result = await axios.get('/api/users/current', config);
        dispatch({ type: CURRENT_USER, payload: result.data.user }); // Ensure correct payload structure
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};


//DELETE
export const deleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/users/${id}`);
        dispatch(getUsers());
    } catch (error) {
        dispatch({type : FAIL_USER, payload : error.response})
    }
}

// Update user


export const editUser = (id, newUser) => async (dispatch) => {
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
  
      // Configure headers with Authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make PUT request to update user
      await axios.put(`/api/users/${id}`, newUser, config);
  
      // Dispatch action to get updated user list
      dispatch(getUsers());
    } catch (error) {
      // Dispatch FAIL_USER action on error
      dispatch({ type: FAIL_USER, payload: error.response });
    }
  };