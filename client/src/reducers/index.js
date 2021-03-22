import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import mylearnings from './mylearnings'
export default combineReducers({
    alert,
    auth,
    mylearnings
});