import React from 'react' 
import './new_comment.css'


class NewComment extends React.Component {

    constructor(props){
        super(props)
        this.state = this.props.comment
    }



    handleChange(e){
        e.preventDefault();
        this.setState({body: e.target.value})
    }

    handleSubmit(){
        this.props.createComment(this.state).then(res =>
            this.props.refresh()
        )
        
        this.setState({body: ''})
    }


    render(){
        return (
            <div>
                <form className="comment-form" onSubmit={()=> this.handleSubmit()} >
                    <textarea 
                        value={this.state.body} 
                        onChange={(e)=> this.handleChange(e)}
                        placeholder="leave a comment"
                        className="comment-input"
                    >
                    </textarea>
                    <button className="post-button">Post</button>
                </form>
            </div>
        )
    }
}

export default NewComment