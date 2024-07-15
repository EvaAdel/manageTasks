import * as taskController from "./task.controller.js";
import { Router } from "express";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { createTaskSchema } from "./task.schema.js";

const router = Router();

router.post("/createTask", authenticationMiddleware(), validation(createTaskSchema), errorHandling(taskController.createTask));
router.get("/getAllTasks", authenticationMiddleware(), errorHandling(taskController.getAllTasks));
router.get("/getTaskById/:taskId", authenticationMiddleware(), errorHandling(taskController.getTaskById));
router.delete("/deleteTask/:deletedItem_id", authenticationMiddleware(), errorHandling(taskController.deleteTask));
router.put("/updateTask/:updateItemId", authenticationMiddleware(), validation(createTaskSchema), errorHandling(taskController.updateTask));
router.patch("/FromUndoneToDone/:taskId", authenticationMiddleware(), errorHandling(taskController.FromUndoneToDone));

export default router