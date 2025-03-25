const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  "mongodb+srv://test:test@todo-app.55n6y.mongodb.net/?retryWrites=true&w=majority&appName=Todo-App";

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
