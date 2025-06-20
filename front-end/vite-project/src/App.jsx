import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Board from "./Board";
import Card from "./Card";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchBarContent, setsearchBarContent] = useState("");
  const [currentBoardId, setCurrentBoardId] = useState(0);
  const [filterOption, setFilterOption] = useState("All");
  const [newCardData, setNewCardData] = useState({
    message: "",
    gif: "",
    author: "",
    upvotes: 0,
    boardid: 0,
  });
  const [gifs, setGifs] = useState([]);
  const setSearch = (props) => {
    setsearchBarContent(props.searchContent);
  };

  const changeFilter = (e) => {
    setFilterOption(e.target.value);
  };

  const findGif = async () => {
    const searchTerm = newCardData.gif;
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=3&rating=g`
    );
    const gif_data = await response.json();
    console.log("gif_data:", gif_data);
    setGifs(gif_data.data);
  };

  const fetchCards = async (id) => {
    const response = await fetch(`${BACKEND_URL}/boards/${id}`);
    const cardData = await response.json();
    setCards(cardData);
    setCurrentBoardId(id);
  };

  const updateCardData = (e) => {
    const { name, value } = e.target;
    setNewCardData({ ...newCardData, [name]: value });
  };

  const fetchBoards = async () => {
    let response;

    if (searchBarContent !== "") {
      response = await fetch(
        `${BACKEND_URL}/boards/search/${searchBarContent}`
      );
    } else {
      switch (filterOption) {
        case "All":
          response = await fetch(`${BACKEND_URL}/boards`);
          console.log("response:", response);
          break;
        case "Recent":
          response = await fetch(`${BACKEND_URL}/boards/recent`);
          break;

        case "Celebration":
          response = await fetch(`${BACKEND_URL}/boards/celebration`);
          break;

        case "Thank You":
          response = await fetch(`${BACKEND_URL}/boards/thankyou`);
          break;

        case "Inspiration":
          response = await fetch(`${BACKEND_URL}/boards/inspiration`);
          break;
      }
    }
    const boardData = await response.json();
    setBoards(boardData);
  };

  const createBoard = async (title, imageUrl, category, author) => {
    const body = JSON.stringify({
      title: title,
      imageUrl: imageUrl,
      category: category,
      author: author,
    });

    await fetch(`${BACKEND_URL}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    fetchBoards();
  };

  const createCard = async (message, gif, author, boardID) => {
    const body = JSON.stringify({
      message: message,
      gif: gif,
      author: author,
      boardid: boardID,
    });
    await fetch(`${BACKEND_URL}/boards/${boardID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    fetchCards(boardID);
  };

  useEffect(() => {
    fetchBoards();
  }, [filterOption, searchBarContent]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header createBoard={createBoard} setSearch={setSearch} />
              <div className="filter-section">
                <label htmlFor="filter">Filter Boards:</label>
                <select
                  id="filter"
                  value={filterOption}
                  onChange={changeFilter}
                  className="filter-dropdown"
                >
                  <option value="All">All</option>
                  <option value="Recent">Recent</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Thank You">Thank You</option>
                  <option value="Inspiration">Inspiration</option>
                </select>
              </div>
              <div className="boards">
                {boards.map((board) => (
                  <Board
                    key={board.id}
                    img={board.imageUrl}
                    title={board.title}
                    category={board.category}
                    id={board.id}
                    fetchBoards={fetchBoards}
                    fetchCards={fetchCards}
                  />
                ))}
              </div>

              <Footer />
            </div>
          }
        >
          {" "}
        </Route>
        <Route
          path="/boards/:boardid"
          element={
            <div className="App">
              <form className="modal-form">
                <div className="form-group">
                  <label htmlFor="message">message:</label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={newCardData.message}
                    onChange={updateCardData}
                    placeholder="Enter board msg"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="author">author:</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={newCardData.author}
                    onChange={updateCardData}
                    placeholder="Enter author"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Gif">Gif:</label>
                  <input
                    type="text"
                    id="gif"
                    name="gif"
                    value={newCardData.gif}
                    onChange={updateCardData}
                    placeholder="gif prompt"
                    required
                  />
                  <button type="button" onClick={findGif}>
                    search
                  </button>
                  <div>
                    {gifs.length === 0 ? (
                      <p>Search for a gif</p>
                    ) : (
                      gifs.map((gif) => (
                        <img
                          key={gif.id}
                          src={gif.images.fixed_height.url}
                          alt={gif.alt_text}
                          onClick={() =>
                            setNewCardData({
                              ...newCardData,
                              gif: gif.images.fixed_height.url,
                            })
                          }
                        />
                      ))
                    )}{" "}
                    <p> Click one to copy url into bar</p>
                  </div>
                </div>
              </form>
              <button
                onClick={() =>
                  createCard(
                    newCardData.message,
                    newCardData.gif,
                    newCardData.author,
                    currentBoardId
                  )
                }
              >
                Create Card
              </button>

              <div className="cards">
                {cards.length === 0 ? (
                  <h1> No cards found </h1>
                ) : (
                  cards.map((card) => (
                    <Card
                      key={card.id}
                      boardid={currentBoardId}
                      cardid={card.id}
                      title={card.title}
                      gif={card.gif}
                      msg={card.msg}
                      upvotes={card.upvotes}
                      author={card.author}
                      fetchCards={fetchCards}
                    />
                  ))
                )}
              </div>
              <Link to={`/`}>
                <button>back Home</button>
              </Link>

              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
