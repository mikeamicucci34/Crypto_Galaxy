import React from 'react' 


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
                <form onSubmit={()=> this.handleSubmit()} >
                    <textarea 
                        value={this.state.body} 
                        onChange={(e)=> this.handleChange(e)}
                        placeholder="leave a comment"
                    >
                    </textarea>
                    <button>Post</button>
                </form>
            </div>
        )
    }
}

export default NewComment