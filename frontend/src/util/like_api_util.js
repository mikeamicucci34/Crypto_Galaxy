import axios from 'axios';


export const createLike = (likeData) => {
    return axios.post('/api/likes/', likeData);
};


export const removeLike = (likeData) => {
    return axios.delete(`/api/likes/`, { data: likeData });
};


export const fetchLikes = () => {
    return axios.get(`/api/likes/`);
};
