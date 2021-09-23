import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchArtwork, deleteArtwork } from '../../actions/artwork_actions';
import ArtworkShow from './artwork_show';
import { getArtComments } from '../../actions/comment_actions'





const mSTP = (state, ownProps) => {
      return {

            artwork: Object.values(state.artworks.all).filter(art =>  art._id === ownProps.match.params.artworkId), 
            currentUser: state.session.user.id,
            comments: Object.values(state.comments)
      }
}


const mDTP = dispatch => ({
      fetchArtwork: artworkId => dispatch(fetchArtwork(artworkId)),
      deleteArtwork: (artworkId) => dispatch(deleteArtwork(artworkId)),
      getArtComments: (artworkId) => dispatch(getArtComments(artworkId))
      
})

export default withRouter(connect(mSTP, mDTP)(ArtworkShow));