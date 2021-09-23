import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createComment } from "../../actions/comment_actions"
import NewComment from './new_comment.jsx'


const mapSTP = (state, ownProps) => {
  
    return {
    comment: {
        body: '',
        user: state.session.user.id,
        artwork: ownProps.match.params.artworkId
    }
}}


const mapDTP = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default withRouter(connect(mapSTP, mapDTP)(NewComment))