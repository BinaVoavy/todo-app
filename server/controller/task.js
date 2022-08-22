import Task from "../models/taskModel.js";
import validateTaskData from "../validators/taskValidator.js";

export const getTask = async function (req, res) {
  try {
    const result = await Task.find({ owner: req.user._id });
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const addTask = async function (req, res) {
  try {
    const error = await validateTaskData(req.body);
    if (error) return res.status(400).send(error);
    const task = new Task({
      description: req.body.description,
      owner: req.body.owner,
      date: req.body.date,
      project: req.body.project,
    });

    const result = await task.save();
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export const updateTask = async function (req, res) {
  try {
    const task = await Task.findById(req.body._id);
    if (!task) return res.status(400);
    task.isDone = !task.isDone;
    await task.save();
    res.send("task updated");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
export const deleteTask = async function (req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(400);
    await Task.deleteOne({ _id: id });
    res.send("task deleted");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};
