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
        this.props.deleteArtwork(this.state._id)
        this.props.refresh()
    }



    render(){
        return (
            <Link className="outer-link-card" to={`/artworks/${this.state._id}`}>
                <motion.div
                className="art-card"
                whileHover={{ scale: 1.1 }}
                >
                        <Link className="nft-link" to={`/artworks/${this.state._id}`}><img className="nft" src={this.state.artworkImage} alt="" /></Link>
                        <div className="title-like">
                        <h3 className="title">{this.state.title}</h3>
                        </div>
                        <h3>{this.state.description}</h3>
                        <Link to={`./update_artworks/${this.state.artworkId}`}></Link>
                </motion.div>
            </Link>
        )
    }
}

export default ArtworkCard