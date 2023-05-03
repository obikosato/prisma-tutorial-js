const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const PORT = 8001;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  return res.json(post);
});

app.post("/", async (req, res) => {
  const { title, body } = req.body;
  const post = await prisma.post.create({
    data: { title, body },
  });
  return res.json(post);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, body },
  });
  return res.json(updatedPost);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  });
  return res.json(deletedPost);
});

app.listen(PORT, () => {
  console.log("サーバーが起動中...");
});
