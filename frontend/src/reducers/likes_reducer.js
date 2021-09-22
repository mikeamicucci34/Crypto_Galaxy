import {
    RECEIVE_LIKE, RECEIVE_LIKES
} from '../actions/like_actions';

const LikesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_LIKE:
            newState.new = action.like
            return newState;
        case RECEIVE_LIKES:
            newState.all = action.likes.data;
            return newState
        default:
            return state;
    }
};

export default LikesReducer;