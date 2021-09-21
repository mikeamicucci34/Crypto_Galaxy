import React from 'react';
import { connect } from 'react-redux';
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

const mSTP = (state, ownProps) => ({
      artwork: state.artworks[ownProps.match.artworkId],
      formType: 'Update Review'
})

const mDTP = (dispatch) => ({
      fetchArtwork: (artworkId) => dispatch(fetchArtwork(artworkId)),
      submitArtwork: (artwork) => dispatch(updateArtwork(artwork))
})

export default connect (mSTP, mDTP)(EditArtWork)


