import { connect } from 'react-redux';
import Profile from './profile.jsx';
import { fetchUser, updateUser } from "../../actions/user_actions";
import { getUserArtwork } from '../../actions/artwork_actions.js';
import {fetchArtwork, updateArtwork, deleteArtwork} from '../../actions/artwork_actions'

const mapStateToProps = (state) => {
    debugger;
    return {
        currentUser: state.session.user,
        user: state.users.user,
        artworks: Object.values(state.artworks.user),
        // userImage: state.users.user.userImage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId)),
        updateUser: user => dispatch(updateUser(user)),
        getUserArtwork: userId => dispatch(getUserArtwork(userId)),
        fetchArtwork: artworkId => dispatch(fetchArtwork(artworkId)),
        updateArtwork: artwork => dispatch(updateArtwork(artwork)),
        deleteArtwork: artworkId => dispatch(deleteArtwork(artworkId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);