import Joi from "joi";

import { generalRules } from "./../../utils/general-rules.utils.js";




//validation for create category
export const createCategorySchema = {
    body: Joi.object({
        name: Joi.string().required().messages({
            "string.base": "name must be a type of string",
            "any.required": "please enter your name",
        }),
        description: Joi.string().messages({
            "string.base": "description must be a type of string",
            "any.required": "please enter your description",

        }),
    }),}


    //validation for update category
export const updateCategorySchema = {
    body: Joi.object({
        name: Joi.string().required().messages({
            "string.base": "name must be a type of string",
            "any.required": "please enter your name",
        }),
        description: Joi.string().messages({
            "string.base": "description must be a type of string",
            "any.required": "please enter your description",

        }),
    params:Joi.object({
        updateItemId:generalRules.objectId.required()
    }),
})}
