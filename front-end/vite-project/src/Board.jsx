import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = (props) => {
    console.log(props)
    //EACH BOARD DISPLAYS img,title, categoirty, view board button delete board button
    return(
        <div className='Board'>
            <img src={props.img} alt ="board image"/>
            <div className='Board-header'>
                <h2>{props.title}</h2>
                <h3>{props.category}</h3>
            </div>
            <div className="inputs">
                <button>View Board</button>
                <button>Delete Board</button>
            </div>
        </div>

    )
}

export default Board
