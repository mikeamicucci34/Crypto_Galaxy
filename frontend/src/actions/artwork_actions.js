import * as APIUtil from '../util/artwork_api_util';

export const RECEIVE_ARTWORK = "RECEIVE_ARTWORK";
export const RECEIVE_ARTWORKS = "RECEIVE_ARTWORKS";
export const REMOVE_ARTWORK = "REMOVE_ARTWORK"
export const RECEIVE_USER_ARTWORKS = "RECEIVE_USER_ARTWORKS"


export const receiveArtwork = artwork => ({
    type: RECEIVE_ARTWORK,
    artwork
})

export const receiveArtworks = artworks => ({
    type: RECEIVE_ARTWORKS,
    artworks
})

export const removeArtwork = artworkId => ({
    type: REMOVE_ARTWORK,
    artworkId
})

export const receiveUserArtworks = artworks => ({
  type: RECEIVE_USER_ARTWORKS,
  artworks
});

export const fetchArtwork = artworkId => dispatch => {
    
    return (
        APIUtil.fetchArtwork(artworkId).then((artwork) => (
        dispatch((receiveArtwork(artwork)))
    )))
};

export const fetchArtworks = () => dispatch => (
    APIUtil.fetchArtworks().then((artworks) => (
        dispatch((receiveArtworks(artworks)))
    ))
);

export const createArtwork = (artworkData) => dispatch => {
    
    return (
        
        APIUtil.createArtwork(artworkData).then((artwork) => (dispatch((receiveArtwork(artwork)))))
    
    )
}

export const updateArtwork = (artworkData) => dispatch => (
    APIUtil.updateArtwork(artworkData).then((artwork) => (
        dispatch((receiveArtwork(artwork)))
    ))
);

export const deleteArtwork = (artworkId) => dispatch => (
    APIUtil.deleteArtwork(artworkId).then(() => (
        dispatch((removeArtwork(artworkId)))
    ))
);

export const getUserArtwork = (userId) => dispatch => (
    APIUtil.getUserArtwork(userId).then((artworks) => (
        dispatch((receiveUserArtworks(artworks)))  
    )).catch(err => console.log(err))
);

