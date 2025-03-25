const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Todo = require("../models/todo");
const logUtil = require("../utils/logger");
const MONGO_URI =
  "mongodb+srv://test:test@todo-app.55n6y.mongodb.net/?retryWrites=true&w=majority&appName=Todo-App";

// Mock environment variables
require("dotenv").config();

// Sample todo data
let todoId;
let todoIdList = [];

// Connect to the test database before running tests
beforeAll(async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
});

// Clean up after tests
afterAll(async () => {
  todoIdList.forEach((id) => {
    logUtil.logInfoMessage("deleting test object with id: " + id);
    Todo.findByIdAndDelete(id);
  });
  await mongoose.connection.close();
});

/**
 * @test Create a new Todo
 */
describe("POST /todos", () => {
  it("should create a new todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ title: "Test Todo", completed: false });

    logUtil.logInfoMessage("response: " + JSON.stringify(response));

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Todo");
    expect(response.body.completed).toBe(false);
    todoId = response.body._id;
    todoIdList.push(todoId);
  });
});

/**
 * @test Get all Todos
 */
describe("GET /todos", () => {
  it("should return a list of todos", async () => {
    const response = await request(app).get("/api/todos");

    logUtil.logInfoMessage("response: " + response);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
