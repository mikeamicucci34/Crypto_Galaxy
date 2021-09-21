import { connect } from "react-redux";
import { fetchArtworks } from "../../actions/artwork_actions";
import Artwork from "./artworks";

const mapStateToProps = (state) => {
  return {
    artworks: Object.values(state.artworks.all),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArtworks: () => dispatch(fetchArtworks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artwork);