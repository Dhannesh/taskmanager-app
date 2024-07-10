import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasksController.js";

const tasksRoutes = express.Router();

tasksRoutes.route("/").get(getAllTasks).post(createTask);
tasksRoutes.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default tasksRoutes;
