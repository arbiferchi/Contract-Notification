
// initial state

import { FAIL_DOC, GET_DOC, GET_DOCS, LOAD_DOC } from "../actionTypes/docs";

const initialState = {
    listDoc : [],
    error : null,
    load : false,
    DocToGet: {}
}


// pure function

const DocReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_DOC:
            return { ...state, load: true };
        case GET_DOCS:
            return { ...state, load: false, listDoc: payload.data }; 
        case GET_DOC:
            return { ...state, DocToGet: payload, load: false };
        case FAIL_DOC:
            return { ...state, load: false, errors: payload };
        default:
            return state;
    }
};

export default DocReducer;