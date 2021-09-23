import React, { Component } from 'react'

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
            user.append('email', this.state.email)
            user.append('handle', this.state.handle)
            user.append('bio', this.state.bio)
            user.append('_id', this.state._id)
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
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        <img src={this.state.file}/>
                    </div>
                </form>
            </div>
        )
    }
}
