import mongoose from "mongoose";

const db = function () {
  mongoose
    .connect(
      `mongodb+srv://binea:${process.env.TODO_MONGODB_PASSWORD}@cluster0.i3rzhpf.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("database connected"))
    .catch((err) => console.log("database", err));
};

export default db;
