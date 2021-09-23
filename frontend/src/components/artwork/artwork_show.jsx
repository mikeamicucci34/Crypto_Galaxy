import React from 'react';
import { Link } from 'react-router-dom';
import NewComment from '../comment_form/new_comment_container'
import CommentItem from '../comments_list/comments_item.jsx'
import './artwork_show.css'
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';




class ArtworkShow extends React.Component {
      constructor(props) {
            super(props)
            this.state = {comments: this.props.comments}

            const CoinGecko = require('coingecko-api');
            const CoinGeckoClient = new CoinGecko();
            var func = async () => {
                  this.eth = await CoinGeckoClient.coins.fetch('ethereum', {});
            }
            func();
      }

      

      componentDidMount() {
            this.props.fetchArtwork(this.props.match.params.artworkId);
            this.props.getArtComments(this.props.match.params.artworkId);
            this.props.fetchUsers()
            this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
      }

      componentWillMount() {
            this.props.fetchUsers();
      }

      componentWillUnmount() {
            clearInterval(this.interval);
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
      releaseDate(date) {
            let releaseDate = new Date(date).getTime()
            let today = new Date().getTime()
            if (today < releaseDate) {
                  var milisec_diff = releaseDate - today;
                  var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
                  var date_diff = new Date(milisec_diff);
                  if (days >= 1 && days < 2) {
                        return days + " day left"
                  } else if (days > 1) {
                        return days + " days left"
                  } else {
                        let hours = date_diff.getHours();
                        if (date_diff.getHours() < 10) {
                              hours = `0${date_diff.getHours()}`
                        }
                        let minutes = date_diff.getMinutes()
                        if (date_diff.getMinutes() < 10) {
                              minutes = `0${date_diff.getMinutes()}`
                        }
                        let seconds = date_diff.getSeconds()
                        if (date_diff.getSeconds() < 10) {
                              seconds = `0${date_diff.getSeconds()}`
                        }
                        return (hours + ':' + minutes + ':' + seconds + ' left')
                  }
            } else {
                  var milisec_diff = 0;
                  return 'Released!'
            }

      }
   
      ethTracker() {
            if (this.eth === undefined) {
                  return 'Loading...'
            } else {
                  return this.eth.data.tickers[1].last
            }
      }

      ethValue(price) {
            let num = price / this.ethTracker()
            let numRound = num.toFixed(5);
            return numRound
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
                        <p className="ethShow">{this.ethValue(this.props.artwork[0].price)} <Icon icon={ethIcon} /></p>
                        <p>{this.props.artwork[0].description}</p>
                        <p>{this.releaseDate(this.props.artwork[0].date)}</p>
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
                                            users =  {this.props.users} 
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