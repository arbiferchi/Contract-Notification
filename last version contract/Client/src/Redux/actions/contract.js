import axios from "axios";
import { LOAD_CONTRACT, GET_CONTRACTS, GET_CONTRACT, FAIL_CONTRACT } from "../actionTypes/contract";

// GET ALL Contract

export const getContracts = () => async (dispatch) => {
    dispatch({ type: LOAD_CONTRACT });
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Token is missing");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        let result = await axios.get('/api/contracts', config);
        dispatch({ type: GET_CONTRACTS, payload: result.data });
    } catch (error) {
        console.error("API Error:", error.response);
        dispatch({ type: FAIL_CONTRACT, payload: error.response });
    }
};

// add Contract 


export const addContract = (newContract) => async (dispatch) => {
    try {
      await axios.post("/api/contracts", newContract, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch(getContracts());
    } catch (error) {
      dispatch({ type: 'FAIL_CONTRACT', payload: error.response });
    }
  };


//delete 


export const deleteContract = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/contracts/${id}`);
        dispatch(getContracts());
    } catch (error) {
        dispatch({type : FAIL_CONTRACT, payload : error.response})
    }
}

// edit

export const editContract = (id, newContract) => async (dispatch) =>{
    try {
        await axios.put(`/api/contracts/${id}`,newContract);
        dispatch(getContracts());
    } catch (error) {
        dispatch({type : FAIL_CONTRACT, payload : error.response})
    }
}

// GET one

export const getOneContract = (id) => async (dispatch) => {
    dispatch({type: LOAD_CONTRACT})
    try {
        let result = await axios.get(`/api/contracts/${id}`);
        dispatch( {type: GET_CONTRACT , payload : result.data});
    } catch (error) {
        dispatch({type : FAIL_CONTRACT, payload : error.response})
    }
}