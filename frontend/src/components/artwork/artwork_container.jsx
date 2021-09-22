import { connect } from "react-redux";
import { deleteArtwork, fetchArtworks } from "../../actions/artwork_actions";
import { createLike, removeLike, fetchLikes } from "../../actions/like_actions"
import Artworks from "./artworks";

const mapStateToProps = (state) => {
  return {
    artworks: Object.values(state.artworks.all),
    userId: state.session.user.id,
    likes: state.likes.all
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
        fetchArtworks: () => dispatch(fetchArtworks()),
        deleteArtwork: (artworkId) => dispatch(deleteArtwork(artworkId)),
        createLike: (like)=> dispatch(createLike(like)),
        removeLike: (like)=> dispatch(removeLike(like)),
        fetchLikes: ()=>dispatch(fetchLikes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artworks);