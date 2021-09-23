import React, { Component } from 'react'
import './profile_pic.css'

export default class ProfilePic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this.props.user,
            userImage: null,
            file: null
        }

        this.submitPhoto = this.submitPhoto.bind(this)
    }

    componentDidMount(){
        if (this.props.currentUser !== 0){
            this.props.fetchUser(this.props.currentUser.id);
            
        }
            
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(this.props.user && prevProps.user){
    //         if(prevState.bio !== this.props.user.bio && prevState.toggle === 'show'){           
    //                 this.props.fetchUser(this.props.user.id)
    //         }
    //     }
    // }

    submitPhoto(e){
        e.preventDefault();
      
        this.setState({user: this.props.user})
        
        let user = new FormData() 
            user.append('email', this.props.user.email)
            user.append('handle', this.props.user.handle)
            user.append('bio', this.props.user.bio)
            user.append('_id', this.props.user._id)
            user.append('userImage', this.state.userImage[0])
        
        this.props.updateUserProfilePic(user).then(() => this.props.history.push(`/user/${this.props.currentUser.id}`))
        
        this.setState({
            userImage: null,
            file: null
        })
    }
    
    
    render() {
        return (
            <div>
                <div className="profilePicUploadComponent">
                    <form onSubmit={this.submitPhoto} encType="multipart/form-data">
                        <div className="artwork__createComponentUpload">
                        <h3>Upload Profile Pic</h3>
                            <div className="artwork__createComponentUploadButton">
                            <p> .image, .jpeg, .png, .gif Max 100mb. </p>
                            
                                <input type='file' name="userImage" 
                                    onChange={(e) => this.setState({ userImage: e.target.files, file: URL.createObjectURL(e.target.files[0]) })} 
                                    multiple={false}/> 
                            </div>
                        </div>
                        <div className="submit-button">
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                    <div className="artwork__previewComponent">
                        <h3>Profile Pic Preview</h3>
                        <div className="artwork__previewComponentText">
                            {(this.state.file) ? <img src={this.state.file} />
                            :
                            <p>Upload file to preview your profile pic</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
