import React from "react";
import { withRouter } from "react-router-dom";
import Artbox from "./artbox";

class Artwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artworks: [],
    };
  }

  componentDidMount() {
    this.props.fetchArtworks();
  }

  componentDidUpdate(prevProps) {
      if (this.props.artworks.length !== prevProps.artworks.length) {
                  this.setState({ artworks: this.props.artworks });
        }
  }

  render() {
    if (this.state.artworks.length === 0) {
      return <div>There are no Tweets</div>;
    } else {
      return (
        <div>
          <h2>All Artworks</h2>
          {this.state.artworks.map((artwork) => (
            <Artbox key={artwork._id} title={artwork.title} description={artwork.description} price={artwork.price} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Artwork);