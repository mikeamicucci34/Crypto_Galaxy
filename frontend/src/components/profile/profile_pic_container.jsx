import { connect } from 'react-redux';
import ProfilePic from './profile_pic';
import { fetchUser, updateUserProfilePic } from "../../actions/user_actions";

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        userId: state.session.user.id,
        user: state.users.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId)),
        updateUserProfilePic: user => dispatch(updateUserProfilePic(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePic);