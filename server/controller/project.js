import Project from "../models/projectModel.js";
import validateProjectData from "../validators/projectValidator.js";

export const getProject = async function (req, res) {
  try {
    const result = await Project.find({ owner: req.user._id });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export const addProject = async function (req, res) {
  try {
    const error = await validateProjectData(req.body);
    if (error) return res.status(400).send(error);
    const project = new Project({
      name: req.body.name,
      owner: req.body.owner,
    });
    const result = await project.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async function (req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(400);
    await Project.deleteOne({ _id: id });
    res.send("project deleted");
  } catch (error) {
    console.log(error);
  }
};
