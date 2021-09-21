
import { connect } from 'react-redux';
import { createArtwork } from '../../actions/artwork_actions';

import ArtworkCreate from './artwork_create';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated,
    newArtwork: state.artworks.new
});

const mDTP = dispatch => {
    
    return {
        createArtwork: (artworkData) => dispatch(createArtwork(artworkData))
    }
}

export default connect(mSTP, mDTP)(ArtworkCreate);
