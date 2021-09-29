import React from "react";
import { withRouter } from "react-router-dom";
import Artbox from "./artbox.jsx";
import './artworks.css'

class Artwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artworks: [],
      placeholder: 'y',
      time: Date.now()
    };


    const CoinGecko = require('coingecko-api');
    const CoinGeckoClient = new CoinGecko();
    var func = async () => {
      this.eth = await CoinGeckoClient.coins.fetch('ethereum', {});
    }
    func();
  }

  componentDidMount() {


    this.props.fetchArtworks().then(() => this.setState({ artworks: this.props.artworks}));
    this.props.fetchLikes();
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
            hot += (1/(today - dateVal))*1000000;
            count+=1;
          }
        }
    }
    let likeArr = [count, liked,hot]
    return likeArr
  }
  ethTracker(){
    if (this.eth===undefined){
      return 'Loading...'
    }else{
      return this.eth.data.tickers[1].last
    }
  }
  render() {
    if (this.state.artworks.length === 0) {
      return null;
    } else {
      return (
        <div className="arts-container">
          <div className="artwork-grid">
           {this.state.artworks.map((artwork) => (
             <Artbox key={`${this.myLikes(artwork._id)[1]}` + `${artwork._id}` + `${this.myLikes(artwork._id)[0]}` +`${this.state.artworks.length}`} title={artwork.title} description={artwork.description}
                  price={artwork.price} deleteArtwork={this.props.deleteArtwork} 
                  artworkId={artwork._id} refresh={ this.refresh.bind(this)} createLike={this.props.createLike} currentUser={this.props.userId}
               artworkImage={artwork.artworkImage} removeLike={this.props.removeLike} likes={this.myLikes(artwork._id)} date={artwork.date} eth={this.ethTracker()} price={artwork.price}/>
           ))}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Artwork);