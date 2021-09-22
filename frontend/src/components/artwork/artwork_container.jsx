import { connect } from "react-redux";
import { deleteArtwork, fetchArtworks } from "../../actions/artwork_actions";
import Artworks from "./artworks";

const mapStateToProps = (state) => {
  return {
    artworks: Object.values(state.artworks.all),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
        fetchArtworks: () => dispatch(fetchArtworks()),
        deleteArtwork: (artworkId) => dispatch(deleteArtwork(artworkId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artworks);