import categoriesModel from "../../../DB/models/categories.model.js";
import { errorHandlingClass } from "../../utils/error-class.utils.js";
import { deleteOne, updateOne } from "../../handlers-factory.js";


// Create

export const createCategory = async (req, res,next) => {
    const {_id}=req.authUser;

    const { name, description } = req.body;

    const categoriesExits=await categoriesModel.findOne({name,user:_id});
    
    if(categoriesExits) return next(new errorHandlingClass("category already exists", 400));

    const newCategory = await categoriesModel.create({
        name,
        description,
        user: _id,
    })
    res.status(201).json({msg:"created successfully",newCategory})
}


// Read

export const getAllCategories = async (req, res) => {
    const {_id}=req.authUser;
    const categories = await categoriesModel.find({user:_id});
    res.status(200).json(categories);
}

// Update

export const updateCategory = updateOne(categoriesModel)



// Delete

export const deleteCategory = deleteOne(categoriesModel)