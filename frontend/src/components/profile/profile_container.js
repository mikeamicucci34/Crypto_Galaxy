import { connect } from 'react-redux';
import Profile from './profile.jsx';
import { fetchUser, updateUser } from "../../actions/user_actions";
import { getUserArtwork } from '../../actions/artwork_actions.js';
import {fetchArtwork, updateArtwork, deleteArtwork,fetchArtworks} from '../../actions/artwork_actions'
import { fetchLikes } from '../../actions/like_actions'
const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        user: state.users.user,
        artworks: Object.values(state.artworks.user),
        likes: state.likes.all,
        allArtworks: state.artworks.all
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId)),
        updateUser: user => dispatch(updateUser(user)),
        getUserArtwork: userId => dispatch(getUserArtwork(userId)),
        fetchArtwork: artworkId => dispatch(fetchArtwork(artworkId)),
        updateArtwork: artwork => dispatch(updateArtwork(artwork)),
        deleteArtwork: artworkId => dispatch(deleteArtwork(artworkId)),
        fetchLikes: ()=>dispatch(fetchLikes()),
        fetchArtworks:()=>dispatch(fetchArtworks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);