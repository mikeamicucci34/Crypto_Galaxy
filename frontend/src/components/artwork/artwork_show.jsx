import React from 'react';
import { Link } from 'react-router-dom';
import NewComment from '../comment_form/new_comment_container'
import CommentItem from '../comments_list/comments_item.jsx'




class ArtworkShow extends React.Component {
      // constructor(props) {
      //       super()
      //       this.state = {key: ""}
            
      // }

      

      componentDidMount() {
            this.props.fetchArtwork(this.props.match.params.artworkId)
            this.props.getArtComments(this.props.match.params.artworkId)
      }

      refresh(){
            this.props.fetchArtwork(this.props.match.params.artworkId)
            this.props.getArtComments(this.props.match.params.artworkId).then(res => this.forceUpdate() )
      }

      handleDelete() {
        this.props.deleteArtwork(this.props.artwork[0]._id).then(() => this.props.history.push('/artworks'))
      }

   
      

      render() {
            if (this.props.artwork.length === 0) return null
            debugger
            let deleteButton;
            let updateButton;
            if (this.props.artwork[0].user === this.props.currentUser) {
                  deleteButton = <button onClick={() => this.handleDelete.bind(this)}>Delete Artwork</button>
                  updateButton = <Link to={`/update_artwork/${this.props.artwork[0]._id}`}>Edit</Link>
            } else {
                  deleteButton = <button onClick={() => this.handleDelete()}>Delete Artwork</button>
                  updateButton = <Link to={`/update_artwork/${this.props.artwork[0]._id}`}>Edit</Link>
            }
            let comments = this.props.comments.map((comment, i)=> {
             return <CommentItem key={i} comment = {comment}                                                                    
            /> })

            return (
                  <div>
                        <img src={this.props.artwork[0].artworkImage} alt="" />
                        <p>{this.props.artwork[0].title}</p>
                        <p>{ this.props.artwork[0].price}</p>
                        <p>{this.props.artwork[0].description}</p>
                        {deleteButton}
                        {updateButton}
                        <NewComment refresh={this.refresh.bind(this)} />
                        {comments}
                  </div>
            )
      }
}

export default ArtworkShow;