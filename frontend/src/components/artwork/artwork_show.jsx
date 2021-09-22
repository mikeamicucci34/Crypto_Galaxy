import React from 'react';
// import { Link } from 'react-router-dom';




class ArtworkShow extends React.Component {
      // constructor(props) {
      //       super(props)
      // }
      componentDidMount() {
            
            this.props.fetchArtwork(this.props.match.params.artworkId)
      }

      

      render() {
            
            if (this.props.artwork.length === 0) return null
            return (
                  <div>
                        <img src={this.props.artwork[0].artworkImage} alt="" />
                        <p>{this.props.artwork[0].title}</p>
                        <p>{ this.props.artwork[0].price}</p>
                        <p>{ this.props.artwork[0].description}</p>
                  </div>
            )
      }
}

export default ArtworkShow;