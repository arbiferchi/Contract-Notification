import {combineReducers} from"redux";
import userReducer from "./user";
import supplierReducer from "./supplier";
import contractReducer from "./contract";
import DocReducer from "./docs";
import darkModeReducer from "./darkmode";


const rootReducer = combineReducers({userReducer, supplierReducer, contractReducer, DocReducer, darkMode: darkModeReducer}) 

export default rootReducer;