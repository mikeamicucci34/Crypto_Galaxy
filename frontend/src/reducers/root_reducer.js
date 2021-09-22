import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import artworks from './artwork_reducer'
import users from './users_reducer'

import likes from './likes_reducer'

import comments from './comment_reducer'


const RootReducer = combineReducers({
    session,
    errors,
    users,
    artworks,
    likes,
    comments
});

export default RootReducer;