import React from 'react'


class CommentItem extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.comment
    }



    render(){
        return (
            <p>{this.state.body}</p>
        )
    }

}


export default CommentItem