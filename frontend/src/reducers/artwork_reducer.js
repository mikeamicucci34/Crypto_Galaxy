import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
} from '../actions/session_actions';

const ArtworksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        
        default:
            return state;
    }
};

export default ArtworksReducer;