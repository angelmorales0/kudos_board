import cors from "cors";
import express from "express";
const app = express(); // Sets up the
const PORT = process.env.PORT || 3000;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

//prisma.db.findmany is how you query
//CRUD COMMANDS BELOW

//Board API calls

app.get("/boards", async (req, res) => {
  const boards = await prisma.board.findMany(); //retrieves boards
  res.json(boards);
});

app.get("/boards/celebration", async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { category: "CELEBRATION" }
  });
  res.json(boards);
});

app.get("/boards/thankyou", async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { category: "THANK_YOU" }
  });
  res.json(boards);
});

app.get("/boards/inspiration", async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { category: "INSPIRATION" }
  });
  res.json(boards);
});

app.get("/boards/recent", async (req, res) => {
  const boards = await prisma.board.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 6
  });
  res.json(boards);
});

app.get('/boards/search/:searchname', async (req, res) => {
  const { searchname } = req.params;
  const boards = await prisma.board.findMany({
    where: { title: { contains: searchname, mode: 'insensitive' } }
  });
  res.json(boards);
});

app.post("/boards", async (req, res) => { // creates board
  const board = await prisma.board.create({
    data: {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      author: req.body.author,
    }
  });
  res.json(board);
 });

app.delete("/boards/:boardID/delete", async (req, res) => { //deletes board
  const boardId = parseInt(req.params.boardID); // PARAMS is :board it auto knows
  //NEED TO DELETE CARDS INSIDE BOARRD

  const result = await prisma.$transaction(async (prisma) => { // TRANSACTION makes it so all activate or none
    await prisma.card.deleteMany({
      where: {boardid: boardId}
    });
    return await prisma.board.delete({ where: { id: boardId } }); // returns delted board data
  });
  res.json(result);


});
//Board API calls ABOVE

//Card API calls BELOW

app.get("/boards/:boardID", async (req, res) => { //gets cards for a board
  const boardId = parseInt(req.params.boardID);
  const cards = await prisma.card.findMany({
    where: {boardid: boardId},
    orderBy: { id: 'asc' }
  });
  res.json(cards);
});

app.post("/boards/:boardID", async (req, res) => { //creates card
  const boardId = parseInt(req.params.boardID);
  const card = await prisma.card.create({
    data: {
      message : req.body.message,
      gif: req.body.gif,
      author: req.body.author,
      upvotes: req.body.upvotes,
      boardid: boardId,
    }
  });
  res.json(card);
});
app.delete("/boards/:boardID/cards/:cardID/delete", async (req, res) => {
  const cardId = parseInt(req.params.cardID);
  const deletedCard = await prisma.card.delete({ where: { id: cardId } });
  res.json(deletedCard);
});

app.patch("/boards/:boardID/cards/:cardID/upvote", async (req, res) => {
  const cardId = parseInt(req.params.cardID);
  const updatedCard = await prisma.card.update({ where: { id: cardId },
     data: {
    upvotes: {increment: 1}
} });
  res.json(updatedCard);
});

app.listen(PORT, () => {
  //sets up the server
  console.log(`Server is running on http://localhost:${PORT}`);
});
