import React from 'react';
import './profile.css'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            toggle: "show"
        }
    }

    componentWillMount(){
        this.props.getUserArtwork(this.props.currentUser.id)
    }

    
    componentDidMount(){
        if (this.props.currentUser !== 0){
            this.props.fetchUser(this.props.currentUser.id);
            
        }
            this.setState({user: this.props.user})
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.user && prevProps.user){
            if(prevState.bio !== this.props.user.bio && prevState.toggle === 'show'){           
                    this.props.fetchUser(this.props.user.id)
            }
        }
    }
    
    submitBio(e){
        e.preventDefault();
        let user= {
            email: this.props.user.email,
            handle: this.state.handle,
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
        if (!this.props.user) return null
        console.log(this.state);
        let bio;
        if(this.state.toggle === "show"){
            bio = <div className="user-bio">
                        <div>{this.props.user.bio}</div>
                        <button className="login-button" onClick={()=>this.setState({toggle: 'edit'})}>Edit Bio</button>
                        <Link to={`/create_artwork`}>
                            <AddCircleOutlineIcon/>
                        </Link>
                    </div>
        } else if(this.state.toggle === "edit") {
            bio = <form className="user-bio" onSubmit={(e)=>this.submitBio(e)}>
                        <textarea className="login-input" placeholder='Biography' onChange={this.update('bio')}></textarea>
                        <button className="login-button">Submit</button>
                  </form>
        }
        
            return (
                <div id="midCard">
                    <div className="profilePic"></div>
                    <div className="user-info">
                    <h1>{this.props.user.handle}</h1>
                    {bio}
                    </div>
                    <div>
                        <input type='file' name="userImage" 
                            onChange={(e) => this.setState({ userImage: e.target.files })} 
                            multiple={false}/> 
                    </div>
                </div>
            );
        
    }
}

export default Profile;