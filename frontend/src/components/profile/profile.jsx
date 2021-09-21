import React from 'react';
import './profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            bio: ''
        }

        this.submitBio = this.submitBio.bind(this)
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
    submitBio(e){
        e.preventDefault();
        let user= {
            email: this.props.user.email,
            handle: this.state.bio,
            bio: this.state.bio,
            id: this.props.user._id
        }
        debugger;
        this.props.updateUser(user)
        
    }

    update(text) {
        return e => {
            this.setState({ [text]: e.currentTarget.value })
        }
    }
    render() {
            return (
                <div id="midCard">
                    <h1>Username: {this.props.user.handle}</h1>
                    <form onSubmit={this.submitBio}>
                        <textarea placeholder='Biography' onChange={this.update('bio')}></textarea>
                        <button>Submit</button>
                    </form>
                    <div>asdfasdfasdf: {this.props.user.bio}</div>
                </div>
            );
        
    }
}

export default Profile;