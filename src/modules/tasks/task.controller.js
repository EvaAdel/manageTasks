import taskModel from "../../../DB/models/tasks.model.js";
import { deleteOne, updateOne } from "../../handlers-factory.js";
import { errorHandlingClass } from "../../utils/error-class.utils.js";
import categoriesModel from "../../../DB/models/categories.model.js";
//CREATE

export const createTask = async (req, res, next) => {
  const { _id } = req.authUser;
  const { categoryId, privateOption, taskName, textTask, listTasks, taskType } =
    req.body;

  const newTask = {
    user: _id,
    categoryId,
    privateOption,
    taskName,
    taskType,
  };

  if (taskType === "textTask") {
    newTask.textTask = textTask;
  } else if (taskType === "listTasks") {
    newTask.listTasks = listTasks;
  }

  const Task = await taskModel.create(newTask);

  res.status(201).json({ msg: "created successfully", Task });
};

//READ
export const getAllTasks = async (req, res, next) => {
  const { _id } = req.authUser;
  const { categoryName, privateOption, sortField, sortOrder, limit, page } =
    req.query;
  const sort = {};
  if (sortField && sortOrder) {
    sort[sortField] = +sortOrder;
  }
  const query = { user: _id };
  if (privateOption) {
    query.privateOption = privateOption;
  }

  if (categoryName) {
    const category = await categoriesModel.findOne({ name: categoryName });
    query.categoryId = category._id;
  }
  const tasks = await taskModel
    .find(query)
    .sort(sort)
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(200).json({
    msg: "That is all task you must to do :) ,never give up , success is waiting for you",
    tasks,
  });
};

//Who can see my tasks
//Public((visible to all users and unauthenticated viewers) or private (visible only to the creator).)
export const getTaskById = async (req, res, next) => {
  const _id = req.authUser?._id;

  const { taskId } = req.params;

  const Tasks = await taskModel.findById({ _id: taskId });
  if (!Tasks) {
    return next(new errorHandlingClass("task not found", 404));
  }

  if (Tasks.privateOption === "private") {
    if (Tasks.user.toString() !== _id?.toString()) {
      return next(
        new errorHandlingClass(
          "Sorry you are not allowed to see this task",
          403
        )
      );
    } else {
      res
        .status(200)
        .json({ msg: "get Up !!success does not come easily ;)", Tasks });
    }
  } else {
    res
      .status(200)
      .json({ msg: "get Up !!success does not come easily ;)", Tasks });
  }
};

//Delete

export const deleteTask = deleteOne(taskModel);

//Update

export const updateTask = updateOne(taskModel);


//update task from Undone to Done

export const FromUndoneToDone = async (req, res, next) => {
  const { taskId } = req.params;
  const { _id } = req.authUser; //user id
  const doneTask = await taskModel.findOneAndUpdate(
    { user: _id, _id: taskId },
    { taskIsDone: true },
    { new: true }
  );
  if (!doneTask) {
  return next (new errorHandlingClass("task not found", 404));
}
res.status(200).json({ msg: "done successfully", doneTask });
}

