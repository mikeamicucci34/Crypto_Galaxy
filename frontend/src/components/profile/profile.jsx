import React from 'react';
import './profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            toggle: "show"
        }
    }

    
    componentDidMount(){
        if (this.props.currentUser){
        this.props.fetchUser(this.props.currentUser.id);
        }
    }

    componentDidUpdate(){
        this.props.fetchUser(this.props.currentUser.id)
    }
    
    submitBio(e){
        e.preventDefault();
        let user= {
            email: this.props.user.email,
            handle: this.state.bio,
            bio: this.state.bio,
            id: this.props.user._id
        }
        this.props.updateUser(user)
        
        this.setState({toggle: 'show'})
        
    }

    update(text) {
        return e => {
            this.setState({ [text]: e.currentTarget.value })
        }
    }
    render() {
        if (!this.props.user) return null;
        console.log(this.state.toggle);
        let bio;
        if(this.state.toggle === "show"){
            bio = <div>
                        <div>{this.props.user.bio}</div>
                        <button onClick={()=>this.setState({toggle: 'edit'})}>Edit Bio</button>
                    </div>
        } else if(this.state.toggle === "edit") {
            bio = <form onSubmit={(e)=>this.submitBio(e)}>
                        <textarea placeholder='Biography' onChange={this.update('bio')}></textarea>
                        <button>Submit</button>
                  </form>
        }
        
            return (
                <div id="midCard">
                    <h1>Username: {this.props.user.handle}</h1>
                    {bio}
                </div>
            );
        
    }
}

export default Profile;