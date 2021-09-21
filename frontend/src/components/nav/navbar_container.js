
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar.jsx';

const mapStateToProps = state =>{
   debugger;
    return {
        loggedIn: state.session.isAuthenticated,
        session: state.session
    }   
}



export default connect(
    mapStateToProps,
    { logout }
)(NavBar);