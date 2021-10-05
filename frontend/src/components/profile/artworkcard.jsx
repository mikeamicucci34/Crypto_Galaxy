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

         // limit description length on profile to 100 characters

        let truncateDescription;
        if (this.state.description.length >= 110) {
           truncateDescription = this.state.description.slice(0,110) + "..."
        } else {
            truncateDescription = this.state.description
        }

        let truncatetitle;
        if (this.state.title.length >= 20) {
           truncatetitle = this.state.title.slice(0,20) + "..."
        } else {
            truncatetitle = this.state.title
        }


        return (
            <Link className="outer-link-card" to={`/artworks/${this.state._id}`}>
                <motion.div
                className="art-card"
                whileHover={{ scale: 1.1 }}
                >
                        <Link className="nft-link" to={`/artworks/${this.state._id}`}><img className="nft" src={this.state.artworkImage} alt="" /></Link>
                        <div className="title-like">
                        <h3 className="profile_cardTitle">{truncatetitle}</h3>
                        </div>
                        <h3 className="cardDescription">{truncateDescription}</h3>
                        <Link to={`./update_artworks/${this.state.artworkId}`}></Link>
                </motion.div>
            </Link>
        )
    }
}

export default ArtworkCard