import React from 'react'
import './artbox.css'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default class Artbox extends React.Component {

    constructor(props){
        super(props) 
        this.state = {
            likeToggle: 'unliked'
        }
    }

    toggleLike(){
        if (this.state.likeToggle === 'unliked'){
            this.setState({likeToggle: 'liked'})
        } else {
            this.setState({likeToggle: 'unliked'})
        }
    }
    

    handleDelete() {
        this.props.deleteArtwork(this.props.artworkId)
        this.props.refresh()
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

                    <Link to={`artworks/${this.props.artworkId}`}><img src={this.props.artworkImage} /></Link>
                    <img className="nft" src={this.props.artworkImage} alt="" />
                    <div className="title-like">
                    <h3 className="title">{this.props.title}</h3>
                        <button className="like" onClick={()=>this.toggleLike()}>
                            {icon}
                        </button>
                    </div>
                    <h3>{this.props.description}</h3>
                    <h3>{this.props.price}</h3>
                    <button className="login-button" onClick={() => this.handleDelete()}>Delete</button>
                    <Link to={`./update_artworks/${this.props.artworkId}`}></Link>
                
            </motion.div>
        )
    }
}





