import * as APIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKE"
export const RECEIVE_LIKES = "RECEIVE_LIKES"


export const receiveLike = (like) => {
    return ({
        type: RECEIVE_LIKE,
        like
    })
};

export const receiveLikes = (likes) => {
    return ({
        type: RECEIVE_LIKES,
        likes
    })
};

export const fetchLikes = () => dispatch => (
    APIUtil.fetchLikes().then((likes) => (
        dispatch((receiveLikes(likes)))
    ))
);

export const createLike = (likeData) => dispatch => {
    return (
        APIUtil.createLike(likeData).then((like) => (dispatch((receiveLike(like)))))
    )
}

export const removeLike = (likeData) => dispatch => {
    return (
        APIUtil.removeLike(likeData).then((like) => (dispatch((receiveLike(like)))))
    )
}