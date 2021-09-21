import { connect } from 'react-redux';
import Profile from './profile.jsx';
import { fetchUser, updateUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
    debugger;
    return {

        currentUser: state.session.user,
        user: state.users.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId)),
        updateUser: user => dispatch(updateUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);