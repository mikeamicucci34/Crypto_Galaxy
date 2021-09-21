import React from 'react'
import './artbox.css'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

export default class Artbox extends React.Component {
    

    handleDelete() {
        this.props.deleteArtwork(this.props.artworkId)
        this.props.refresh()
    }
    
    render() {

        return (
            <motion.div 
            className="art-card"
            whileHover={{ scale: 1.1 }}
            >
                <div className="nft"></div>
                <div>
                <h3>{this.props.title}</h3>
                </div>
                <h3>{this.props.description}</h3>
                <h3>{this.props.price}</h3>
                <button onClick={() => this.handleDelete()}>Delete</button>
                <Link to={`./update_artworks/${this.props.artworkId}`}></Link>
            </motion.div>
        )
    }
}





