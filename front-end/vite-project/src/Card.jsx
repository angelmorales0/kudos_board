import React from "react";
import "./Card.css";
//title,msg,gif,author,upvotes,boardid, cardID,}
const Card = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const deleteCard = async () => {
    await fetch(
      `${BACKEND_URL}/boards/${props.boardid}/cards/${props.cardid}/delete`,
      {
        method: "DELETE",
      }
    );
    props.fetchCards(props.boardid);
  };
  const upvoteCard = async () => {
    await fetch(
      `${BACKEND_URL}/boards/${props.boardid}/cards/${props.cardid}/upvote`,
      {
        method: "PATCH",
      }
    );
    props.fetchCards(props.boardid);
  };

  return (
    <div className="Card">
      <div className="Card-header">
        <h2>{props.title}</h2>
      </div>
      <img src={props.gif} alt={`${props.title}card-gif`} />
      <h2>{props.msg}</h2>
      <h3> Card From {props.author}</h3>
      <div className="inputs">
        <button onClick={upvoteCard}>upvotes: {props.upvotes}</button>
        <button onClick={deleteCard}>Delete Card</button>
      </div>
    </div>
  );
};

export default Card;
