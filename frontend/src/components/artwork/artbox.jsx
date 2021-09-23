import React from 'react'
import './artbox.css'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Icon, InlineIcon } from '@iconify/react';
import ethIcon from '@iconify/icons-cryptocurrency/eth';

export default class Artbox extends React.Component {

    constructor(props){
        super(props) 
        this.state = {
            likeToggle: this.props.likes[1],
            likes: this.props.likes[0],
            hotval: this.props.likes[2]
        }
    }
    toggleLike(){
        if (this.state.likeToggle === 'unliked'){
            this.setState({likeToggle: 'liked', likes: this.state.likes+1})
            let like = {
                artworkId: this.props.artworkId,
                userId: this.props.currentUser
            }
            this.props.createLike(like)
        } else {
            let like = {
                artworkId: this.props.artworkId,
                userId: this.props.currentUser
            }
            this.props.removeLike(like);
            this.setState({ likeToggle: 'unliked', likes: this.state.likes-1 })
        }
    }
    fireIcon(){
        if (this.state.hotval > 1){
            return (<LocalFireDepartmentIcon/>)
        }
    }
    releaseDate(date){
        let releaseDate = new Date(date).getTime()
        let today= new Date().getTime()
        if (today < releaseDate) {
            var milisec_diff = releaseDate - today;
            var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
            var date_diff = new Date(milisec_diff);
            if (days >= 1 && days < 2){
                return days + " day left"
            }else if(days > 1){
                return days + " days left"
            }else{
                let hours = date_diff.getHours();
                if (date_diff.getHours() < 10){
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
    ethValue(){
        let num = this.props.price/this.props.eth
        let numRound = num.toFixed(5);
        return numRound 
    }
    render() {
        let icon;
        if (this.state.likeToggle === 'unliked') {
            icon = <FavoriteBorderIcon />
        } else {
            icon = <FavoriteIcon />
        }
        return (
            <motion.div 
            className="art-card"
            whileHover={{ scale: 1.1 }}
            >

                    <div className="fireIcon">{this.fireIcon()}</div>
    

                    <Link to={`artworks/${this.props.artworkId}`}><img className="nft" src={this.props.artworkImage} alt="" /></Link>

                    <div className="title-like">
                    <h3 className="title">{this.props.title}</h3>
                        <div className="likeComponent">
                        <button className="like" onClick={()=>this.toggleLike()}>
                            {icon}
                        </button>
                        <h1>{this.state.likes}</h1>
                        </div>

                    </div>

                    <div className="stats">
                    <div>
                    <h3>{this.props.price}.00$</h3>
                    <br />
                    <h3 className="eth">{this.ethValue()} <Icon icon={ethIcon} /></h3>
                    </div>
                    <div>
                    <h3 className="statsDate">{this.releaseDate(this.props.date)}</h3>
                    </div>
                    </div>
            </motion.div>
        )
    }
}





