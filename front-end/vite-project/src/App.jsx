import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Board from './Board';
import Card from './Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

//ROUTER POINT IS TO HANDLE NAVIGATION AND ROUTING OF THE APP
//Create and filter boards from within here
const App = () => {
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    console.log(boards,"boards")

  }, [boards]);

//USE HTTP FOR NOW LEARN HOW TO DO IT DYNAMICALLY WITH ADDRESS ON FRIDAY!

const fetchBoards = async () => {
  const response = await fetch("http://localhost:3000/boards")
  const board_data = await response.json();

  await setBoards(board_data);

};

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ //THE ROUTE FOR THE HOME PAGE
        <div className="App">
        <Header />
        <div className='boards'>
          {boards.map(board =>

            <Board key={board.id}
            img={board.imageUrl}
            title={board.title}
            category={board.category}
            id={board.id}
            fetchBoards={fetchBoards}
            >

            </Board>
          )}
        </div>

        <Footer />

    </div>}> </Route>
      <Route path='/boards/:boardid' element={ <Card //THE ROUTE FOR A SPECIFIC BOARD (ID NEEDED)
          title= "Amazing Job on the Project!"
          gif="https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif"
          msg="Your dedication and hard work on this project really paid off. The client was thrilled with the results!"
          author="Sarah Johnson"

        />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
