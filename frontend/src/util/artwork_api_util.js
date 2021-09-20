
import axios from 'axios';

export const fetchArtwork = (artworkId) => {
    return axios.get(`/api/artoworks/${artworkId}`, artworkData);
};

export const fetchArtworks = () => {
    return axios.get('/api/artoworks', artworksData);
};

export const createArtwork = (artworkData) => {
    return axios.post('/api/artoworks', artworkData);
};

export const updateArtwork = (artworkData) => {
    return axios.update(`/api/artoworks/${artworkData.id}`, artworkData);
};

export const deleteArtwork = (artworkId) => {
    return axios.update(`/api/artoworks/${artworkId}`, );
};
