import React from 'react';
import './profile.css'

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
        if (this.props.currentUser){
        this.props.fetchUser(this.props.currentUser.id);
        }
    }
    componentWillReceiveProps(newState) {
 
    }

    render() {
        
            return (
                <div>
                    <h2>All of This User's Tweets</h2>
                    <h1>{this.props.user.handle}</h1>
                </div>
            );
        
    }
}

export default Profile;