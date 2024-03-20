import { DataService } from "../services/data.service.js";
import { createPath } from "../../utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";

const TASKS_PATH = createPath(["data", "tasks.json"]);

class Tasks {
    id = uuid();
    isFinished = false

    constructor(text, author) {
        this.text = text;
        this.author = author;
    }
};

const tasksSchema = Joi.object({
    text: Joi.string().min(2).required(),
    author: Joi.string().min(2).required(),
});

export class TasksModel {
    //Save students
    static async saveTasks(tasks) {
      await DataService.saveJSONFile(TASKS_PATH, tasks);
    }
  
    //1. Get all tasks
    static async getAllTasks() {
      const tasks = await DataService.readJSONFile(TASKS_PATH);
  
      return tasks;
  
      //One liner solution to above code
      // return DataService.readJSONFile(STUDENTS_PATH)
    }
  
    //2. Get tasks by id
    static async getTasksById(tasksId) {
      const tasks = await this.getAllTasks();
  
      const foundTasks = tasks.find(task => task.id === tasksId);
  
      if (!foundTasks) throw new Error("Task not found");
  
      return foundTasks;
    }
  
    //3. Create tasks
    static async createTasks(taskData) {
      const tasks = await this.getAllTasks();
  
      const validation = tasksSchema.validate(taskData);
  
      if (validation?.error) throw new Error(validation.error.details[0].message);
  
      const { text, author } = taskData;
  
      const newTasks = new Tasks(text, author);
  
      const updatedTasks = [...tasks, newTasks];
  
      await this.saveTasks(updatedTasks);
  
      return newTasks;
    }
  
    //4. Update tasks
    static async updateTask(taskId, updateData) {
      if (updateData.id) throw new Error("Can't update student! Invalid request");
  
      const tasks = await this.getAllTasks();
  
      const tasksExists = tasks.some(task => task.id === taskId);
  
      if (!tasksExists)
        throw new Error("Can't update student! Student not found!");
  
      let updatedTask = null;
  
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          updatedTask = { ...task, ...updateData };
  
          return updatedTask;
        } else {
          return task;
        }
      });
  
      await this.saveTasks(updatedTasks);
  
      return updatedTasks;
    }
  
    //5 Delete tasks
    static async deleteTask(tasksId) {
      const tasks = await this.getAllTasks();
  
      const updatedTasks = tasks.filter(
        tasks => tasks.id !== tasksId
      );
  
      if (tasks.length === updatedTasks.length)
        throw new Error("Can't delete student! Student not found!");
  
      await this.saveTasks(updatedTasks);
    }
    //6 Delete all tasks
    static async deleteAllTasks() {
      await this.saveTasks([]);
    }
  }