import axios from "axios";
import { FAIL_DOC, GET_DOC, GET_DOCS, LOAD_DOC } from "../actionTypes/docs";



export const getDocs = () => async (dispatch) => {
    dispatch({ type: LOAD_DOC });
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
        let result = await axios.get('/api/docs', config);
        dispatch({ type: GET_DOCS, payload: result.data });
    } catch (error) {
        console.error("API Error:", error.response);
        dispatch({ type: FAIL_DOC, payload: error.response });
    }
};

// add Doc 


export const addDoc = (newDoc) => async ( dispatch) => {
    try {
        await axios.post("/api/docs", newDoc)
        dispatch(getDocs());
    } catch (error) {
        dispatch({type : FAIL_DOC, payload : error.response})
    }
};


//delete 


export const deleteDoc = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/docs/${id}`);
        dispatch(getDocs());
    } catch (error) {
        dispatch({type : FAIL_DOC, payload : error.response})
    }
}

// edit

export const editDoc = (id, newDoc) => async (dispatch) =>{
    try {
        await axios.put(`/api/docs/${id}`,newDoc);
        dispatch(getDocs());
    } catch (error) {
        dispatch({type : FAIL_DOC, payload : error.response})
    }
}

// GET one

export const getOneDoc = (id) => async (dispatch) => {
    dispatch({type: LOAD_DOC})
    try {
        let result = await axios.get(`/api/docs/${id}`);
        dispatch( {type: GET_DOC , payload : result.data});
    } catch (error) {
        dispatch({type : FAIL_DOC, payload : error.response})
    }
}