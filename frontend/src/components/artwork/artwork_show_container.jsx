import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchArtwork, deleteArtwork } from '../../actions/artwork_actions';
import ArtworkShow from './artwork_show';
import { getArtComments, updateComment, removeComment } from '../../actions/comment_actions'
import { fetchUsers } from '../../actions/user_actions';






const mSTP = (state, ownProps) => {
      
      return {

            artwork: Object.values(state.artworks.all).filter(art =>  art._id === ownProps.match.params.artworkId), 
            currentUser: state.session.user.id,
            comments: Object.values(state.comments),
            users: Object.values(state.users),
      }
}


const mDTP = dispatch => ({
      fetchArtwork: artworkId => dispatch(fetchArtwork(artworkId)),
      deleteArtwork: (artworkId) => dispatch(deleteArtwork(artworkId)),
      getArtComments: (artworkId) => dispatch(getArtComments(artworkId)),
      updateComment: comment => dispatch(updateComment(comment)),
      removeComment: commentId => dispatch(removeComment(commentId)),
      fetchUsers: () => dispatch(fetchUsers())
      
})

export default withRouter(connect(mSTP, mDTP)(ArtworkShow));