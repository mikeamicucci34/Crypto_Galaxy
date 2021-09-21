import React from 'react'
import { Link } from 'react-router-dom'

export default class Artbox extends React.Component {
    

    handleDelete() {
        this.props.deleteArtwork(this.props.artworkId)
        this.props.refresh()
    }
    
    render() {

        return (
            <div>
                 <h3>{this.props.title}</h3>
                <h3>{this.props.description}</h3>
                <h3>{this.props.price}</h3>
                <button onClick={() => this.handleDelete()}>Delete</button>
                <Link to={`./update_artworks/${this.props.artworkId}`}></Link>
            </div>
        )
    }
}



