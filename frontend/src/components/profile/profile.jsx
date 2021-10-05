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
            toggle: "show",
            x: 'x',
            show: 'Creations'
        }
    }


    componentWillMount(){
        this.props.getUserArtwork(this.props.match.params.userId);
        this.props.fetchArtworks();
        this.props.fetchLikes();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchUser(nextProps.match.params.userId);
            this.props.getUserArtwork(nextProps.match.params.userId)
        }
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
            .then(res => {
                this.setState({toggle: 'show'})
                this.refresh()
             })
        

        
    }

    update(text) {
        return e => {
            this.setState({ [text]: e.currentTarget.value })
        }
    }
    returnVal(){
        if (this.props.currentUser !== undefined && this.props.user!== undefined ){
            if (this.props.currentUser.id === this.props.user._id){
                return (<Link to={`/user/${this.props.user._id}/profile_pic`}>
                    <button>Update Profile Pic</button>
                </Link>)
            }
            else{
                return(<div></div>)
            }
        }
              
    }
    fetchLikedArtworks(){
        let likedArr = []
        for(let i=0;i<this.props.likes.length;i++){
            if (this.props.likes[i].userId === this.props.user._id){
                likedArr.push(this.props.likes[i].artworkId)
            }
        }
        return likedArr;
    }
    toggleCreations(){
        if(this.state.show !== 'Creations'){
            this.setState({show: 'Creations'})
        }
    }

    toggleLikes() {
        if (this.state.show !== 'Likes') {
            this.setState({ show: 'Likes' })
        }
    }
    render() {
        let likedArtworkIds
        let likedArtworkObjs = []
        if(this.props.likes && this.props.user){
            likedArtworkIds = this.fetchLikedArtworks();
        }
        if(likedArtworkIds){
            for (let i = 0; i < likedArtworkIds.length;i++){
              for(let j=0; j<this.props.allArtworks.length;j++){
                  if (likedArtworkIds[i] === this.props.allArtworks[j]._id){
                      likedArtworkObjs.push(this.props.allArtworks[j])
                  }
              }  
            }
        }
        let likes
        if(likedArtworkObjs.length > 0 && this.state.show === 'likes'){
            likes = likedArtworkObjs.map((art) => <ArtworkCard artwork={art}
                refresh={this.refresh.bind(this)}
                fetchArtwork={this.props.fetchArtwork}
                updateArtwork={this.props.update}
                deleteArtwork={this.props.deleteArtwork}
                key={art._id}
            />)

        }

        if (!this.props.user) return null
        let arts
        if(this.state.show==='Creations'){
             arts = this.props.artworks.map((art)=>  <ArtworkCard artwork={art}
                                                    refresh ={this.refresh.bind(this)}
                                                    fetchArtwork={this.props.fetchArtwork}
                                                    updateArtwork={this.props.update}
                                                    deleteArtwork={this.props.deleteArtwork}
                                                    key={art._id}
                                                    />)
        }else{
            arts = likedArtworkObjs.map((art) => <ArtworkCard artwork={art}
                refresh={this.refresh.bind(this)}
                fetchArtwork={this.props.fetchArtwork}
                updateArtwork={this.props.update}
                deleteArtwork={this.props.deleteArtwork}
                key={art._id}
            />)
        }
 
        
        let newArt;
        if (this.props.currentUser.id === this.props.user._id){ 
            newArt = (
                <motion.div
                    className="addart-card"
                    whileHover={{ scale: 1.1 }}
                > 
                    <Link className="create-art" to={`/create_artwork`}>
                            <AddCircleOutlineIcon className="add-icon"/>
                    </Link>
                    <p>Post a new art</p>
                </motion.div>
            )
        } else {
            newArt = null
        }

        let bio;
        if (this.state.toggle === "show"){
            if (this.props.currentUser.id === this.props.user._id){
            bio = <div className="user-bio">
                        <div>{this.props.user.bio}</div>
                        <button  onClick={()=>this.setState({toggle: 'edit'})}>Edit Bio</button>
                    </div>
            }else(
                bio = <div className="user-bio">
                    <div>{this.props.user.bio}</div>
                    </div>
            )
        } else if (this.state.toggle === "edit") {
            bio = <form className="user-bio" onSubmit={(e)=>this.submitBio(e)}>
                        <textarea className="login-input" placeholder='Biography' onChange={this.update('bio')}></textarea>
                        <button >Submit</button>
                  </form>
        }
        let propic;
        if (this.props.user.userImage) { 
            propic = <div className="profilePicReal">
                        <img src={this.props.user.userImage}/>
                    </div>
        } else {
           propic = <div className="profilePicFake">
                    </div>
        }

            return (
                <div className="userProfile">
                <div id="midCard">
                    {propic}
                    <div className="user-info">
                    <h1>{this.props.user.handle}</h1>
                    <div className="user-bioContainer">
                        {bio}
                    </div>
                    
                    <div className="profilePicEdit">
                        {this.returnVal()}
                    </div>
                     <div className="toggleLikeCreations">
                        <button onClick={()=>this.toggleCreations()}>Creations</button>
                        <button onClick={() => this.toggleLikes()}>Liked Posts</button>
                    </div>
                    </div>
                    {/* <div>
                        <input type='file' name="userImage" 
                            onChange={(e) => this.setState({ userImage: e.target.files })} 
                            multiple={false}/> 
                    </div> */}
                </div>
                <h1>{this.state.show}</h1>
                <ul className="user-arts">
                {newArt}
                {arts}
                </ul>
                {/* <ul className="user-arts"> 
                        {likes}
                </ul> */}
                </div>
            );
    }
}

export default Profile;