const express = require("express"); // Sets up the server
const app = express(); // Sets up the
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Build your CRUD operations for your board component.
//GET CARDS, CREATE BOARD, DELETE BOARD, GET BOARDS (FILTER by name,)
//
//Build your CRUD operations for your card component.
// CREATE CARD, DELETE CARD, UPVOTE CARD,

//Add routes to add cards to boards and retrieve cards belonging to a specific board.

//Add error handling to each of your routes.
