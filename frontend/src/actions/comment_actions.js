import * as APIUtil from '../util/comment_api_util'


export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const RECEIVE_ART_COMMENTS = "RECEIVE_ART_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"


export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

export const receiveArtComments = comments => ({
    type: RECEIVE_ART_COMMENTS,
    comments
})

export const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
})


export const getArtComments = artworkId => dispatch => (
    APIUtil.getArtComments(artworkId).then(comments => (
        dispatch(receiveArtComments(comments))
    )).catch(err => console.log(err))
)

export const createComment = comment => dispatch => (
    APIUtil.createComment(comment).then(comment => dispatch(receiveComment(comment)))
)

export const updateComment = comment => dispatch => (
    APIUtil.editComment(comment).then(comment => dispatch(receiveComment(comment)))
)

export const removeComment = commentId => dispatch => (
    APIUtil.deleteComment(commentId).then(()=> dispatch(deleteComment(commentId)))
)