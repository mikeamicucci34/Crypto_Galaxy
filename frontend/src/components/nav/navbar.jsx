import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="links">
                    <Link className="navbar-link" to={'/profile'}>Profile</Link>
                    <button className="logout-button"  onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links">
                    <Link className="navbar-link" to={'/signup'}>Signup</Link>
                    <Link className="navbar-link" to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="logo"></div>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;