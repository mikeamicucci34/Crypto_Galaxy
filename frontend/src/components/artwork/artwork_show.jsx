import React from 'react';
import { Link } from 'react-router-dom';
import NewComment from '../comment_form/new_comment_container'
import CommentItem from '../comments_list/comments_item.jsx'




class ArtworkShow extends React.Component {
      constructor(props) {
            super(props)
            this.state = {comments: this.props.comments}
      }

      

      componentDidMount() {
            this.props.fetchArtwork(this.props.match.params.artworkId)
            this.props.getArtComments(this.props.match.params.artworkId)
      }

      refresh(){
            this.props.getArtComments(this.props.match.params.artworkId).then(res => this.forceUpdate() )
            this.props.fetchArtwork(this.props.match.params.artworkId)
     }

      handleDelete() {
        this.props.deleteArtwork(this.props.artwork[0]._id).then(() => this.props.history.push('/artworks'))
      }

      componentDidUpdate(prevProps){
            if (prevProps.comments.length !== this.props.comments.length) {
                  this.setState({comments: this.props.comments})
            }
      }

   
      

      render() {
            if (this.props.artwork.length === 0) return null
            if (!this.props.comments) return null;
            let deleteButton;
            let updateButton;
            if (this.props.artwork[0].user === this.props.currentUser) {
                  deleteButton = <button onClick={() => this.handleDelete.bind(this)}>Delete Artwork</button>
                  updateButton = <Link to={`/update_artwork/${this.props.artwork[0]._id}`}>Edit</Link>
            } else {
                  deleteButton = <button onClick={() => this.handleDelete()}>Delete Artwork</button>
                  updateButton = <Link to={`/update_artwork/${this.props.artwork[0]._id}`}>Edit</Link>
            }
            

            return (
                  <div>
                        <img src={this.props.artwork[0].artworkImage} alt="" />
                        <p>{this.props.artwork[0].title}</p>
                        <p>{ this.props.artwork[0].price}</p>
                        <p>{this.props.artwork[0].description}</p>
                        {deleteButton}
                        {updateButton}
                        <NewComment refresh={this.refresh.bind(this)} />
                        {this.state.comments.map((comment, i)=> {
                        return <CommentItem key={`${i}${this.state.comments.length}`} 
                                            comment = {comment}      
                                            currentUser = {this.props.currentUser} 
                                            updateComment = {this.props.updateComment}  
                                            removeComment = {this.props.removeComment}
                                            refresh={this.refresh.bind(this)}                                                           
                        /> })}
                  </div>
            )
      }
}

export default ArtworkShow;