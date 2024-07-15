import { Router } from "express";
import * as categoriesController from "./categories.controller.js";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware.js";
import { errorHandling } from "../../middlewares/error-handling-middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./categories.schema.js";



const router = Router();

router.post("/createCategory",authenticationMiddleware() ,validation(createCategorySchema), errorHandling(categoriesController.createCategory));
router.delete("/deleteCategory/:deletedItem_id", authenticationMiddleware(), errorHandling(categoriesController.deleteCategory));
router.put("/updateCategory/:updateItemId", authenticationMiddleware(),validation(updateCategorySchema), errorHandling(categoriesController.updateCategory));
router.get("/getAllCategories", authenticationMiddleware(), errorHandling(categoriesController.getAllCategories));

export default router