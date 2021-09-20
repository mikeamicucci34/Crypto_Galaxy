import axios from 'axios';

export const getUser = userId => {
    return axios.get(`/api/users/${userId}`)
}

export const getUsers = () => {
    return axios.get("/api/users");
};

