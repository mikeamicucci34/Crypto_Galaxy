import React from 'react'


class CommentItem extends React.Component{
   
    constructor(props){
        super(props)
        this.state = {
            _id: this.props.comment._id,
            body: this.props.comment.body,
            user: this.props.comment.user,
            artwork: this.props.comment.artwork,
            toggle: 'show'
        }
        
    }

    submitEdit() {
        let comment = {
            _id: this.state._id,
            body: this.state.body,
            user: this.state.user,
            artwork: this.state.artwork,
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
                <div>
                    <button onClick={()=> this.handleEdit()}>Edit Comment</button>
                    <button onClick={()=> this.handleDelete()}>Delete Comment</button>
                </div>
            )
        } else {
            buttons = null
        }

        let body;
        if(this.state.toggle === 'show') {
            body = (
                <div className="comment">
                    <p>{this.state.body}</p>
                    {buttons}
                </div>
                
            )
        } else {
            body = (
                <form onSubmit={()=> this.submitEdit()}>
                <textarea value={this.state.body} onChange={(e)=>this.handleChange(e)}></textarea>
                <button>Post</button>
                </form>
            )
        }


       
       
        return body
    }

}


export default CommentItem