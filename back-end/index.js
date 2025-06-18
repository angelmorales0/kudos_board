const express = require("express");
const app = express(); // Sets up the
const PORT = 3000;

app.listen(PORT, () => {
  //sets up the server
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("hi");
});
//Build your CRUD operations for your board component.
//GET CARDS, CREATE BOARD, DELETE BOARD, GET BOARDS (FILTER by name,)

// ROUTES are you method, path, request http calls

//Build your CRUD operations for your card component.
// CREATE CARD, DELETE CARD, UPVOTE CARD,

//Add routes to add cards to boards and retrieve cards belonging to a specific board.

//Add error handling to each of your routes.

//boards CRUD method

//entire backend is p mcuh just app calls
//React MAKES API CALLS USING Fetch

app.get("/boards", (req, res) => {}); //retrieves boards
app.post("/boards", (req, res) => {}); // creates boards
