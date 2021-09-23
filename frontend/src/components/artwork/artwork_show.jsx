import React from 'react';
import { Link } from 'react-router-dom';
import NewComment from '../comment_form/new_comment_container'
import CommentItem from '../comments_list/comments_item.jsx'
import './artwork_show.css'




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
            this.props.getArtComments(this.props.match.params.artworkId).then()
            this.props.fetchArtwork(this.props.match.params.artworkId).then(res => this.forceUpdate() )
            
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
                  deleteButton = <button className="delete-button" onClick={() => this.handleDelete.bind(this)}>Delete</button>
                  updateButton = <Link className="edit-link" to={`/update_artwork/${this.props.artwork[0]._id}`}>Edit</Link>
            } else {
                  deleteButton = null
                  updateButton = null
            }
            

            return (
                  <div className="show-page">
                        <div className="nft-info">
                        <img className="show-image" src={this.props.artwork[0].artworkImage} alt="" />
                        <div className="title-wrapper">
                        <div className="nft-titleandmore">
                        <h3 className="art-title">{this.props.artwork[0].title}</h3>
                        <p>Price: {this.props.artwork[0].price}.00$</p>
                        <p>{this.props.artwork[0].description}</p>
                        <div className="buttons">
                        {deleteButton}
                        {updateButton}
                        </div>
                        </div>
                        </div>
                        </div>
                        <div className="commentsandinfo"> 
                        <div className="comments-wrapper">
                        <div className="comments">
                        {this.state.comments.map((comment, i)=> {
                        return <CommentItem key={`${i}${this.state.comments.length}`} 
                                            comment = {comment}      
                                            currentUser = {this.props.currentUser} 
                                            updateComment = {this.props.updateComment}  
                                            removeComment = {this.props.removeComment}
                                            refresh={this.refresh.bind(this)}                                                           
                        /> })}
                        </div>
                        </div>
                        <NewComment refresh={this.refresh.bind(this)} />
                        </div>
                  </div>
            )
      }
}

export default ArtworkShow;