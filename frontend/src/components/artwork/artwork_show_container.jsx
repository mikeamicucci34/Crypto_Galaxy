import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchArtwork } from '../../actions/artwork_actions';
import ArtworkShow from './artwork_show';




const mSTP = (state, ownProps) => {
      
      return {
            
            artwork: Object.values(state.artworks.all).filter(art =>  art._id === ownProps.match.params.artworkId), 
            // currentUser: 
      }
}


const mDTP = dispatch => ({
      fetchArtwork: artworkId => dispatch(fetchArtwork(artworkId))
})

export default withRouter(connect(mSTP, mDTP)(ArtworkShow));