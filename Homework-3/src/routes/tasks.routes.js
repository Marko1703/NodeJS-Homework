import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

//The url here that will match the below routes will be localhost:4000/api/tasks

export const taskRouter = Router();

taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:id", TaskController.getTasksById);
taskRouter.post("/", TaskController.createTasks);
taskRouter.put("/:id", TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.delete("/", TaskController.deleteAllTasks);