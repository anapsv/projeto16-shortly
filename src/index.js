import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from './routes/usersRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);