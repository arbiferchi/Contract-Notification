// import

import { LOAD_SUPPLIER, GET_SUPPLIERS, GET_SUPPLIER, FAIL_SUPPLIER } from "../actionTypes/supplier";






// initial state

const initialstate = {
    listSupplier : [],
    error : null,
    load : false,
    supplierToGet: {}
}


// pure function

const supplierReducer = (state = initialstate , {type, payload}) => {
    switch (type) {
        case LOAD_SUPPLIER:
            return  {...state, load : true};
        case GET_SUPPLIERS:
            return {...state, load : false, listSupplier: payload.data};
        case GET_SUPPLIER:
            return { ...state, supplierToGet: payload.data, load: false };
        case FAIL_SUPPLIER:
            return{...state, load : false, errors : payload};
    
        default:
            return state
    }
};

export default supplierReducer;