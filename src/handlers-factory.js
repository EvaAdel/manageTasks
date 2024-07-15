import {errorHandling} from "./middlewares/error-handling-middleware.js";
 import {errorHandlingClass} from "./utils/error-class.utils.js";
//import { ApiFeatures } from "./utils/apiFeatures.js";

export const deleteOne = (Model) =>
 async (req, res, next) => {
    const {_id}= req.authUser;
    const { deletedItem_id } = req.params;
    const document = await Model.findOneAndDelete({user:_id,_id:deletedItem_id});
    if (!document) {
      return next(new errorHandlingClass(`document not found ${deletedItem_id}`, 404));
    }
    res.status(200).json({msg:"deleted successfully",document});
  };

export const updateOne = (Model) =>
  async (req, res, next) => {
    const {_id}= req.authUser;
    const {updateItemId}=req.params;
    const document = await Model.findOneAndUpdate({user:_id,_id:updateItemId}, req.body, {
      new: true,
    });
    if (!document) {
      return next(new errorHandlingClass(`document not found ${updateItemId}`, 404));
    }
    res.status(200).json({msg:"updated successfully" ,data: document });
  };

