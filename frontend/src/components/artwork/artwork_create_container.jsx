
import { connect } from 'react-redux';
import { createArtwork } from '../../actions/artwork_actions';
import { fetchUser } from '../../actions/user_actions';
 
import ArtworkCreate from './artwork_create';

const mSTP = (state, ownProps) => {
    return ({
    loggedIn: state.session.isAuthenticated,
    newArtwork: state.artworks.new,
    userId: state.session.user.id,
    artwork: {
        title: "",
        description: "",
        price: "",
        newArtwork: "",
        user: state.session.user.id,
        artworkImage: null,
        file: null
    },
    formType: 'Create Artwork'
})};

const mDTP = dispatch => {
    return {
        submitArtwork: (artworkData) => dispatch(createArtwork(artworkData)),
        fetchUser: userId => dispatch(fetchUser(userId))
    }
}

export default connect(mSTP, mDTP)(ArtworkCreate);
