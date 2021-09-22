import React from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import '../artwork/artbox.css'


class ArtworkCard extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.artwork
    }


    handleDelete(){
        // debugger
        this.props.deleteArtwork(this.state._id)
        this.props.refresh()
    }



    render(){
        return (
            <motion.div 
            className="art-card"
            whileHover={{ scale: 1.1 }}
            >
                    <Link className="nft-link" to={`artworks/${this.state._id}`}><img className="nft" src={this.state.artworkImage} alt="" /></Link>
                    <div className="title-like">
                    <h3 className="title">{this.state.title}</h3>
                    </div>
                    <h3>{this.state.description}</h3>
                    <h3>{this.state.price}</h3>
                    <button className="login-button" onClick={() => this.handleDelete()}>Delete</button>
                    <Link to={`./update_artworks/${this.state.artworkId}`}></Link>
            </motion.div>
        )
    }
}

export default ArtworkCard