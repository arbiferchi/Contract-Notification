import axios from "axios";
import { LOAD_SUPPLIER, GET_SUPPLIERS, GET_SUPPLIER, FAIL_SUPPLIER } from "../actionTypes/supplier";
import {toast} from 'react-hot-toast'




// GET ALL SUPPLIER




export const getSuppliers = () => async (dispatch) => {
    dispatch ({ type : LOAD_SUPPLIER});
    try {
        let result = await axios.get('/api/suppliers')
        dispatch ({type : GET_SUPPLIERS, payload: result.data});
    } catch (error) {
        dispatch({type : FAIL_SUPPLIER, payload : error.response})
        
    }
};

// add SUPPLIER 


export const addSupplier = (newSupplier) => async (dispatch) => {
    try {
        await toast.promise(
            axios.post("/api/suppliers", newSupplier),
            {
                pending: 'Adding supplier...',
                success: 'Supplier added successfully!',
                error: 'Failed to add supplier!'
            }
        ).then(() => {
            dispatch(getSuppliers());
        }).catch(error => {
            throw error; // Throw the error to be caught in the catch block
        });
    } catch (error) {
        dispatch({ type: FAIL_SUPPLIER, payload: error.response });
    }
};


//delete 


export const deleteSupplier = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/suppliers/${id}`);
        dispatch(getSuppliers());
    } catch (error) {
        dispatch({type : FAIL_SUPPLIER, payload : error.response})
    }
}

// edit

export const editSupplier = (id, newSupplier) => async (dispatch) =>{
    try {
        await axios.put(`/api/suppliers/${id}`,newSupplier);
        dispatch(getSuppliers());
    } catch (error) {
        dispatch({type : FAIL_SUPPLIER, payload : error.response})
    }
}

// GET one

export const getOneSupplier = (id) => async (dispatch) => {
    dispatch({type: LOAD_SUPPLIER})
    try {
        let result = await axios.get(`/api/suppliers/${id}`);
        dispatch( {type: GET_SUPPLIER , payload : result.data});
    } catch (error) {
        dispatch({type : FAIL_SUPPLIER, payload : error.response})
    }
}