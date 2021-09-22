import {
    RECEIVE_COMMENT,
    RECEIVE_ART_COMMENTS,
    DELETE_COMMENT
} from '../actions/comment_actions';

const CommentsReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_ART_COMMENTS:
            return {...action.comments.data}
        case RECEIVE_COMMENT: 
            return {...state, ...action.comment.data}
        case DELETE_COMMENT:
            let newState = {...state}
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}

export default CommentsReducer