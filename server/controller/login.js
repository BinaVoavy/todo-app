import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const SECRET_KEY = process.env.TODO_SECRET_KEY;

export default async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).send({ error: "Wrong Username or password" });
    try {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result)
        return res.status(400).send({ error: "Wrong Username or password" });
      res.send({
        username: user.username,
        _id: user._id,
        token: jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7h" }),
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getUser = (req, res) => {
  res.send({
    _id: req.user._id,
    username: req.user.username,
  });
};
