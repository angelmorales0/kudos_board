const cors = require("cors");
const express = require("express");
const app = express(); // Sets up the
const PORT = process.env.PORT || 3000;
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());


app.get("/boards", async (req, res) => {
  console.log("boards");
  const result = await prisma.board.findMany(); //retrieves boards
  res.json(result);

}); //retrieves boards

app.listen(PORT, () => {
  //sets up the server
  console.log(`Server is running on http://localhost:${PORT}`);
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

//boards api calls
