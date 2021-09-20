import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import artworks from './artwork_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    artworks
});

export default RootReducer;