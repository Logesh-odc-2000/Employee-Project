


import { combineReducers } from "redux";
import Reducer from "./reducer";

const rootReducers = combineReducers({ employee: Reducer });
console.log('store', rootReducers);

export default rootReducers;


