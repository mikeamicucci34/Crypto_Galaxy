import React from "react";
import { withRouter } from "react-router-dom";
import Artbox from "./artbox.jsx";
import './artworks.css'

class Artwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artworks: [],
    };
      
  }

  componentDidMount() {
    this.props.fetchArtworks();
    this.props.fetchLikes();
  }

      componentDidUpdate(prevProps) {
        
      if (this.props.artworks.length !== prevProps.artworks.length) {
                  this.setState({ artworks: this.props.artworks });
        }
      }
      
      refresh() {
            this.props.fetchArtworks()
      }
  myLikes(artworkId){
    let count = 0
    let liked = 'unliked'
    let hot = 0
    if(this.props.likes){
        for(let i=0;i<this.props.likes.length;i++){
          if (this.props.likes[i].artworkId === artworkId){
            if (this.props.likes[i].userId === this.props.userId){
                liked = 'liked';
            }
            let dateVal = new Date(this.props.likes[i].createdAt)
            let today = new Date();
            hot += (1/(today - dateVal))*10000;
            count+=1;
          }
        }
    }
    let likeArr = [count, liked,hot]
    return likeArr
  }

  render() {
    if (this.state.artworks.length === 0) {
      return null;
    } else {
          
      return (
        <div className="arts-container">
          <div className="artwork-grid">
           {this.state.artworks.map((artwork) => (
             <Artbox key={`${this.myLikes(artwork._id)[1]}` + `${artwork._id}` + `${this.myLikes(artwork._id)[0]}`} title={artwork.title} description={artwork.description}
                  price={artwork.price} deleteArtwork={this.props.deleteArtwork} 
                  artworkId={artwork._id} refresh={ this.refresh.bind(this)} createLike={this.props.createLike} currentUser={this.props.userId}
                  artworkImage={artwork.artworkImage} removeLike={this.props.removeLike} likes={this.myLikes(artwork._id)}/>
           ))}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Artwork);