import "./AddTask.css";
function AddTask({ onClick }) {
  return (
    <div className="add_task" onClick={onClick}>
      <i className="fa-solid fa-plus"></i> Add Task
    </div>
  );
}

export default AddTask;
