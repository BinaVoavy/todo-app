import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";
import validateUserData from "../validators/userValidator.js";
import bcrypt from "bcrypt";
export default async function signup(req, res) {
  try {
    const error = await validateUserData(req.body);
    if (error) return res.status(400).send(error);
    const hash = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user = await user.save();
    let project = new Project({
      owner: user._id,
      name: "Welcome",
    });
    project = await project.save();
    const task = new Task({
      description: "Put your task here",
      date: "Today",
      owner: user._id,
      project: project._id,
    });
    task.save();
    res.send("Sign up success");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
