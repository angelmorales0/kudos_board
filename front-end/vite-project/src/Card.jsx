import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = (props) => {
    const [upvotes, setUpvotes] = useState(0);
    console.log(props)
    //EACH BOARD DISPLAYS img,title, categoirty, view board button delete board button
    return(
        <div className='Card'>
            <div className='Card-header'>
                <h2>{props.title}</h2>
            </div>
            <img src={props.gif} alt ="card-gif"/>
            <h2>{props.msg}</h2>
            <h3>{props.author}</h3>
            <div className="inputs">
                <button>upvote: {upvotes}</button>
                <button>Delete Card</button>
            </div>
        </div>

    )
}

export default Card
