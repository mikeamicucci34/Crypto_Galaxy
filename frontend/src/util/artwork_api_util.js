import axios from 'axios';

export const fetchArtwork = (artworkId) => {
    return axios.get(`/api/artworks/${artworkId}`);
};

export const fetchArtworks = () => {
    return axios.get('/api/artworks');
};

export const createArtwork = (artworkData) => {
    // return (axios({
    //     method: "post",
    //     url: "/api/artworks",
    //     data: artworkData,
    //     headers: { "Content-Type": "multipart/form-data" },
    // }))
    return axios.post('/api/artworks', artworkData)
}

export const updateArtwork = (artworkData) => {
    return axios.update(`/api/artworks/${artworkData.id}`, artworkData);
};

export const deleteArtwork = (artworkId) => {
    return axios.destroy(`/api/artworks/${artworkId}`, );
};

export const getUserArtwork = (userId) => {
    return axios.get(`/api/artworks/user/${userId}`, );
};