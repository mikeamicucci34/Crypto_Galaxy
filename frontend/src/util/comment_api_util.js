import axios from 'axios';



export const createComment = data => {
    return axios.post('/api/comments/', data)
}

export const editComment = comment => {
    return axios.patch(`api/comments/${comment.id}`, comment)
}

export const deleteComment = commentId => {
    return axios.delete(`api/comments/${commentId}`)
}

export const getArtComments = artworkId => {
    return axios.get(`api/comments/artworks/${artworkId}`)
}