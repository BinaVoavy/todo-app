import express from "express";
import passport from "passport";
import signup from "../controller/signup.js";
import login, { getUser } from "../controller/login.js";
import {
  addProject,
  deleteProject,
  getProject,
} from "../controller/project.js";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controller/task.js";

const route = express.Router();

route.post("/login", login);

route.post("/signup", signup);

route.post("/", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

route.use(passport.authenticate("jwt", { session: false }));
route.get("/user", getUser);
route.get("/project", getProject);
route.post("/project", addProject);
route.delete("/project/:id", deleteProject);
route.get("/task", getTask);
route.post("/task", addTask);
route.put("/task", updateTask);
route.delete("/task/:id", deleteTask);
export default route;
