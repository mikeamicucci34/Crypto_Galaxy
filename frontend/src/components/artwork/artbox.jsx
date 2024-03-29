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

        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });


        let icon;
        if (this.state.likeToggle === 'unliked') {
            icon = <FavoriteBorderIcon />
        } else {
            icon = <FavoriteIcon />
        }
        let price;
        if (this.props.price > 10000000 && this.props.price < 1000000000) {
            price = <h3>{formatter.format((this.props.price/1000000).toFixed(1))}M</h3>
            
        } else if (this.props.price > 1000000000 && this.props.price < 1000000000000) {
            price = <h3>{formatter.format(`${(this.props.price/1000000000).toFixed(1)}`)}B</h3>
        } else if (this.props.price > 1000000000000) (
            price = <h3>{formatter.format(`${(this.props.price/1000000000000).toFixed(1)}`)}T</h3>
        )
        else{
            price = <h3>{formatter.format(`${this.props.price}`)}</h3> 
        }

        let etherPrice;
        if (this.ethValue() > 10000000 && this.ethValue() < 1000000000) {
            etherPrice = <h3>{(this.ethValue()/1000000).toFixed(1)}M</h3>
            
        } else if (this.ethValue() > 1000000000 && this.ethValue() < 1000000000000) {
            etherPrice = <h3>{(this.ethValue()/1000000000).toFixed(1)}B</h3>
        } else if (this.ethValue() > 1000000000000) (
            etherPrice = <h3>{(this.ethValue()/1000000000000).toFixed(1)}T</h3>
        )
        else{
            etherPrice = <h3>{this.ethValue()}</h3> 
        }

        let truncatetitle;
        if (this.props.title.length >= 20) {
           truncatetitle = this.props.title.slice(0,20) + "..."
        } else {
            truncatetitle = this.props.title
        }
       

        return (
            <motion.div 
            className="art-card"
            whileHover={{ scale: 1.1 }}
            >

                    <div className="fireIcon">{this.fireIcon()}</div>
    

                    <Link to={`artworks/${this.props.artworkId}`}><img className="nft" src={this.props.artworkImage} alt="" /></Link>

                    <div className="title-like">
                    <Link to={`artworks/${this.props.artworkId}`} className='titleLink'><h3 className="title">{truncatetitle}</h3></Link>
                        <div className="likeComponent">
                        <button className="like" onClick={()=>this.toggleLike()}>
                            {icon}
                        </button>
                        <h1>{this.state.likes}</h1>
                        </div>

                    </div>

                    <div className="stats">
                    <div>
                    {price}
                    <br />
                    <h3 className="eth"><Icon icon={ethIcon} />{etherPrice}</h3>
                    </div>
                    <div>
                    <h3 className="statsDate">{this.releaseDate(this.props.date)}</h3>
                    </div>
                    </div>

                    <Link to={`./update_artworks/${this.props.artworkId}`}></Link>

            </motion.div>
        )
    }
}





