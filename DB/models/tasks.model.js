import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },

    categoryId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "categoriesModel",
    },

    privateOption: {
      type: String,
      eum: ["public", "private"],
    },

    taskName: {
      type: String, 
      required: true,
    },

    textTask: String,

    listTasks: [
      {
        taskName: String,
        textTask: String,
      },
    ],

    taskType: {
      type: String,
      enum: ["textTask", "listTasks"],
    },

    taskIsDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.taskModel || model("taskModel", taskSchema);
