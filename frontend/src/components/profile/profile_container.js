import { connect } from 'react-redux';
import Profile from './profile.jsx';
import { fetchUser, updateUser } from "../../actions/user_actions";
import { getUserArtwork } from '../../actions/artwork_actions.js';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        user: state.users.user,
        artworks: Object.values(state.artworks.user)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId)),
        updateUser: user => dispatch(updateUser(user)),
        getUserArtwork: userId => dispatch(getUserArtwork(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);