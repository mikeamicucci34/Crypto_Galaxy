import React from 'react';
import './profile.css'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArtworkCard from './artworkcard'
import { motion } from "framer-motion"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            toggle: "show"
        }
    }

    componentWillMount(){
        this.props.getUserArtwork(this.props.match.params.userId)
    }

    
    componentDidMount(){
        if (this.props.currentUser !== 0){
            this.props.fetchUser(this.props.match.params.userId);
            
        }
            this.setState({user: this.props.user})
    }

    refresh(){
            this.props.fetchUser(this.props.currentUser.id)
            this.props.getUserArtwork(this.props.currentUser.id)
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
        this.refresh()
        
    }

    update(text) {
        return e => {
            this.setState({ [text]: e.currentTarget.value })
        }
    }
    render() {
        if (!this.props.user) return null
        let arts = this.props.artworks.map((art)=>  <ArtworkCard artwork={art}
                                                    refresh ={this.refresh.bind(this)}
                                                    fetchArtwork={this.props.fetchArtwork}
                                                    updateArtwork={this.props.update}
                                                    deleteArtwork={this.props.deleteArtwork}
                                                    key={art._id}
                                                    />)
        let bio;
        if(this.state.toggle === "show"){
            bio = <div className="user-bio">
                        <div>{this.props.user.bio}</div>
                        <button className="login-button" onClick={()=>this.setState({toggle: 'edit'})}>Edit Bio</button>
                    </div>
        } else if(this.state.toggle === "edit") {
            bio = <form className="user-bio" onSubmit={(e)=>this.submitBio(e)}>
                        <textarea className="login-input" placeholder='Biography' onChange={this.update('bio')}></textarea>
                        <button className="login-button">Submit</button>
                  </form>
        }
        
            return (
                <div className="userProfile">
                <div id="midCard">
                    <div className="profilePic"></div>
                    <div className="user-info">
                    <h1>{this.props.user.handle}</h1>
                    {bio}
                    </div>
                    {/* <div>
                        <input type='file' name="userImage" 
                            onChange={(e) => this.setState({ userImage: e.target.files })} 
                            multiple={false}/> 
                    </div> */}
                </div>
                <ul className="user-arts">
                <motion.div
                    className="addart-card"
                    whileHover={{ scale: 1.1 }}
                > 
                    <Link className="create-art" to={`/create_artwork`}>
                            <AddCircleOutlineIcon className="add-icon"/>
                    </Link>
                    <p>Post a new art</p>
                </motion.div>
                {arts}
                </ul>
                </div>
            );
    }
}

export default Profile;