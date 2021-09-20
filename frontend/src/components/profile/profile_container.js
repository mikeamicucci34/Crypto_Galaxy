// src/components/profile/profile_container.js
import { fetchUser } from "../../actions/user_actions";
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
    debugger;
    return {
        currentUser: state.session.user,
        user: state.users.user || {handle: ''}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);