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

  componentDidUpdate(newState) {
    this.setState({ artworks: newState.artworks });
  }

  render() {
    if (this.state.artworks.length === 0) {
      return <div>There are no Tweets</div>;
    } else {
      return (
        <div>
          <h2>All Artworks</h2>
          {this.state.artworks.map((artwork) => (
            <Artbox key={artwork._id} text={artwork.title} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Artwork);