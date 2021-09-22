import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';




class ArtworkShow extends React.Component {
      // constructor(props) {
      //       super()
            
      // }
      componentDidMount() {
            
            this.props.fetchArtwork(this.props.match.params.artworkId)
            
      }

      handleDelete() {
        this.props.deleteArtwork(this.props.artwork[0]._id).then(() => this.props.history.push('/artworks'))
    }
      

      render() {
            if (this.props.artwork.length === 0) return null
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
                  </div>
            )
      }
}

export default ArtworkShow;