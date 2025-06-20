import React, { useState, useEffect } from 'react';
import './Card.css';
//title,msg,gif,author,upvotes,boardid, cardID,}
const Card = (props) => {
    console.log(props)
    const deleteCard = async () => {
        await fetch(`http://localhost:3000/boards/${props.boardid}/cards/${props.cardid}/delete`, {
            method: "DELETE",
        })
        props.fetchCards(props.boardid)
    };
    const upvoteCard = async () => {
        await fetch(`http://localhost:3000/boards/${props.boardid}/cards/${props.cardid}/upvote`, {
            method: "PATCH",
        })
        props.fetchCards(props.boardid)
    };

    return(
        <div className='Card'>
            <div className='Card-header'>
                <h2>{props.title}</h2>
            </div>
            <img src={props.gif} alt ="card-gif"/>
            <h2>{props.msg}</h2>
            <h3> Card From {props.author}</h3>
            <div className="inputs">
                <button onClick={upvoteCard}>upvotes: {props.upvotes}</button>
                <button onClick={deleteCard}>Delete Card</button>
            </div>
        </div>

    )
}

export default Card
