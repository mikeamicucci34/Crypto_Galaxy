import {
    RECEIVE_ARTWORK,
    REMOVE_ARTWORK,
    RECEIVE_ARTWORKS,
    RECEIVE_USER_ARTWORKS
} from '../actions/artwork_actions';

const ArtworksReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    // Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_ARTWORK:
            newState.all = {0: action.artwork.data}
            return newState
         
            // return {...state, ...action.artwork.data}
            // return newState.all = action.artwork.data
            // return Object.assign({}, state, action.artwork.data)
        case REMOVE_ARTWORK:
            delete newState.user[action.artworkId]
            return newState
        case RECEIVE_ARTWORKS:
            newState.all = action.artworks.data;
            return newState;
        case RECEIVE_USER_ARTWORKS:
            newState.user = action.artworks.data;
            return newState;
        default:
            return state;
    }
};

export default ArtworksReducer;