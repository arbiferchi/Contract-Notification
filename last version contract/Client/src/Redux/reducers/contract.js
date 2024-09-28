// import

import { FAIL_CONTRACT, GET_CONTRACT, GET_CONTRACTS, LOAD_CONTRACT } from "../actionTypes/contract";



// initial state

const initialState = {
    listContract : [],
    error : null,
    load : false,
    contractToGet: {}
}


// pure function

const contractReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_CONTRACT:
            return { ...state, load: true };
        case GET_CONTRACTS:
            return { ...state, load: false, listContract: payload.data }; 
        case GET_CONTRACT:
            return { ...state, contractToGet: payload, load: false };
        case FAIL_CONTRACT:
            return { ...state, load: false, errors: payload };
        default:
            return state;
    }
};

export default contractReducer;