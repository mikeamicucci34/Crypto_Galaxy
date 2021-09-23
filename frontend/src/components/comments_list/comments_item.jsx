import React from 'react'
import './comment.css'


class CommentItem extends React.Component{
   
    constructor(props){
        super(props)
        this.state = {
            _id: this.props.comment._id,
            body: this.props.comment.body,
            user: this.props.comment.user,
            artwork: this.props.comment.artwork,
            handle: this.props.userHandle,
            toggle: 'show'
        }
        
    }

    submitEdit() {
        let comment = {
            _id: this.state._id,
            body: this.state.body,
            user: this.state.user,
            artwork: this.state.artwork,
            handle: this.state.handle
        }
        this.props.updateComment(comment).then(res => this.props.refresh())
    }

    handleEdit() {
        if (this.state.toggle === 'show') {
            this.setState({toggle: 'edit' }) 
        } else {
            this.setState({toggle: 'show'})
        }

    }

  
    handleDelete(){
        this.props.removeComment(this.props.comment._id)
        this.props.refresh()

    }

    handleChange(e){
        e.preventDefault()
        this.setState({body: e.target.value})
    }

    render(){


        let buttons;
   
        if(this.props.currentUser === this.props.comment.user) {
            buttons = (
                <div className="comment-buttons">
                    <button className="comment-button" onClick={()=> this.handleEdit()}>Edit</button>
                    <button className="comment-button" onClick={()=> this.handleDelete()}>Delete</button>
                </div>
            )
        } else {
            buttons = null
        }
        let commenter = this.props.users.filter(userCommented => userCommented._id === this.props.comment.user)

        let body;
        if (this.state.toggle === 'show') {
           
            body = (
                <div className="comment">
                    <p>{commenter[0].handle}</p>
                    <p>{this.state.body}</p>
                    {buttons}
                </div>
                
            )
        } else {
            body = (
                <form className="comment-form-edit" onSubmit={()=> this.submitEdit()}>
                <textarea className="comment-input" value={this.state.body} onChange={(e)=>this.handleChange(e)}></textarea>
                <button className="post-button" >Post</button>
                </form>
            )
        }


       
       
        return body
    }

}


export default CommentItem