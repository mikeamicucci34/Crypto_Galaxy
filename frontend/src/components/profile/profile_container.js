import { connect } from 'react-redux';
import Profile from './profile.jsx';

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