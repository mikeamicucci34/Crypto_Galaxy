import React from 'react'

export default function Artbox(props) {
    
    return (
        <div>
             <h3>{props.title}</h3>
             <h3>{props.description}</h3>
             <h3>{props.price}</h3>
        </div>
    )
}

