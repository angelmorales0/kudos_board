import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Board from './Board';
import Card from './Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//ROUTER POINT IS TO HANDLE NAVIGATION AND ROUTING OF THE APP
//Create and filter boards from within here
const App = () => {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ //THE ROUTE FOR THE HOME PAGE
        <div className="App">
        <Header />
        <Board
          img= "../public/vite.svg"
          title = "Outstanding Team Leadership"
          category ="recognition"
          id="1"
        />

        <Footer />

    </div>}> </Route>
      <Route path='/board/id' element={ <Card //THE ROUTE FOR A SPECIFIC BOARD (ID NEEDED)
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
