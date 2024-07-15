import mongoose from "mongoose";

const{Schema,model}=mongoose;

const categoriesSchema = new Schema({

        name: {
            type: String,
            required: true,
            trim: true
        },
        
        description:String,

        user:{
            type: Schema.Types.ObjectId,
            ref: "userModel"
        },
},
{
  timestamps: true,
}
);

export default mongoose.models.categoriesModel || model("categoriesModel", categoriesSchema)









