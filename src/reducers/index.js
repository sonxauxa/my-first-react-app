import loggedReducer from "./is_logged";
import {combineReducers} from 'redux'

const allReducer = combineReducers({
    isLogged: loggedReducer
});

export default allReducer;