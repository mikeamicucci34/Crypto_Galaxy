import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updateArtwork, fetchArtwork } from '../../actions/artwork_actions';
import ArtworkCreate from './artwork_create';



class EditArtWork extends React.Component {
      componentDidMount() {
            this.props.fetchArtwork(this.props.match.params.artworkId)
      }

      render() {
            if (!this.props.artwork) return null
            return  (
                  <ArtworkCreate {...this.props} />
            )
      }
}

const mSTP = (state, ownProps) => {
      return {
            artwork: state.artworks.new,
            formType: 'Update Artwork'}
}

const mDTP = (dispatch) => ({
      fetchArtwork: (artworkId) => dispatch(fetchArtwork(artworkId)),
      submitArtwork: (artwork) => dispatch(updateArtwork(artwork))
})

export default withRouter(connect(mSTP, mDTP)(EditArtWork))


