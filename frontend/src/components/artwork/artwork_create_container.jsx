
import { connect } from 'react-redux';
import { createArtwork } from '../../actions/artwork_actions';

import ArtworkCreate from './artwork_create';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated,
    newArtwork: state.artworks.new,
    artwork: {
        title: "",
        description: "",
        price: "",
        newArtwork: "",
        artworkImage: null
    },
    formType: 'Create Artwork'
});

const mDTP = dispatch => {
    return {
        submitArtwork: (artworkData) => dispatch(createArtwork(artworkData))
    }
}

export default connect(mSTP, mDTP)(ArtworkCreate);
