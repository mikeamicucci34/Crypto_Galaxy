// src/components/profile/profile.js

import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        if (this.props.currentUser){
        console.log(this.props.currentUser.id)
        }
    }
    componentDidMount(){
        this.props.fetchUser(this.props.currentUser.id);
    }
    componentWillReceiveProps(newState) {
 
    }

    render() {
        debugger;
            return (
                <div>
                    <h2>All of This User's Tweets</h2>
                    <h1>{this.props.user.handle}</h1>
                </div>
            );
        
    }
}

export default Profile;