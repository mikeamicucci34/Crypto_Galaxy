import React from 'react'
import './artbox.css'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
                <div className="nft"> </div>
                    <div className="fireIcon">{this.fireIcon()}</div>
                    <h1>Hot val:{this.props.likes[2]}</h1>
                    <h1>Likes: {this.props.likes[0]}</h1>
                    <img src={this.props.artworkImage} />
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





