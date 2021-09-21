import { connect } from 'react-redux';
import Profile from './profile.jsx';
import { fetchUser } from "../../actions/user_actions";

const mapStateToProps = (state) => {
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