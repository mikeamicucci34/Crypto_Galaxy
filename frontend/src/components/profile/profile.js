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
        console.log(this.props.currentUser.id)
        this.props.fetchUserTweets(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
 
    }

    render() {
            return (
                <div>
                    <h2>All of This User's Tweets</h2>
                </div>
            );
        
    }
}

export default Profile;