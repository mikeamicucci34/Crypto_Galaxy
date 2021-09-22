import React from 'react';
import { Link } from 'react-router-dom';




class ArtworkShow extends React.Component {
      constructor(props) {
            super(props)
            this.state = this.props.artwork;
      }
      componentDidMount() {
            // debugger
            this.props.fetchArtworks()
      }

      

      render() {
            debugger
            if (this.props.artwork.length === 0) return null
            return (
                  <div>
                        <img src={this.state[0].artworkImage} />
                        <p>{this.state[0].title}</p>
                        <p>{ this.state[0].price}</p>
                        <p>{ this.state[0].description}</p>
                  </div>
            )
      }
}

export default ArtworkShow;