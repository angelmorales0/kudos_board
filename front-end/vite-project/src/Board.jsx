import React, { useState, useEffect } from "react";
import "./Board.css";
import { Link } from "react-router-dom";

const Board = (props) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log(props);
  const deleteBoard = async () => {
    await fetch(`${backend_url}/boards/${props.id}/delete`, {
      method: "DELETE",
    });
    props.fetchBoards();
  };

  return (
    <div className="Board">
      <img src={props.img} alt={`${props.title} board image`} />
      <div className="Board-header">
        <h2>{props.title}</h2>
        <h3>{props.category}</h3>
      </div>
      <div className="inputs">
        <Link to={`/boards/${props.id}`}>
          <button onClick={() => props.fetchCards(props.id)}>View Board</button>
        </Link>
        <button className="delete-button" onClick={deleteBoard}>
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default Board;
