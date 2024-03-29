// src/components/session/login_form_container.js

import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form.jsx';
import { fetchUser } from '../../actions/user_actions';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(login(user)),
        fetchUser: userId => dispatch(fetchUser(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);