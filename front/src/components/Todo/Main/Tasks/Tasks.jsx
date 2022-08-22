import DoneTasks from "./DoneTasks/DoneTasks";
import "./Tasks.css";
import TodoTasks from "./TodoTasks/TodoTasks";

function Tasks() {
  return (
    <>
      <TodoTasks />
      <DoneTasks />
    </>
  );
}

export default Tasks;
