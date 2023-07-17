import express, { Request, Response } from "express";
import mongoose from "mongoose";
import corse from "cors";

import TodoModel from "./models/Todo";

const PORT = 5050;

const app = express();

app.use(corse({ origin: "*" })); // TODO: change this to only allow the client app on production
app.use(express.json());

app.post("/todo", async (req: Request, res: Response) => {
  const body = req.body;

  const newTodo = new TodoModel({
    title: body.title,
    status: body.status,
    priority: body.priority,
  });
  const createdTodo = await newTodo.save();
  res.json(createdTodo);
});

app.get("/todo", async (req: Request, res: Response) => {
  const todos = await TodoModel.find();
  res.json(todos);
});

const db = mongoose
  .connect(
    "mongodb+srv://admin:MrR35s05YwpOwVZv@cluster0.w6jxqee.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT);
  });
