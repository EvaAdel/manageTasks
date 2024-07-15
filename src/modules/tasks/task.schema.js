import Joi from "joi";
import { generalRules } from "../../utils/general-rules.utils.js";


//validation for create task
export const createTaskSchema = {
    body: Joi.object({
        categoryId: generalRules.objectId.required(),
        privateOption: Joi.string().valid("public", "private").required(),
        taskName: Joi.string().required(),
        taskType: Joi.string().valid("textTask", "listTasks").required(),
        textTask: Joi.string().when('listTasks', { is: Joi.exist(), then: Joi.forbidden(), otherwise: Joi.required() }),
        listTasks: Joi.array()
})}


//validation for update task
export const updateTaskSchema = {
    body: Joi.object({
        categoryId: generalRules.objectId.required(),
        privateOption: Joi.string().valid("public", "private").required(),
        taskName: Joi.string().required(),
        taskType: Joi.string().valid("textTask", "listTasks").required(),
        textTask: Joi.string().when('listTasks', { is: Joi.exist(), then: Joi.forbidden(), otherwise: Joi.required() }),
        listTasks: Joi.array()
    }),
    params:Joi.object({
        updateItemId:generalRules.objectId.required()
    }),

}