import { useReducer, useStates } from "../../../../../context/stateContext";
import "./DoneTasks.css";
function DoneTasks() {
  const state = useStates();
  const reducer = useReducer();
  const tasks = state.tasks.filter((element) => {
    if (state.active.type === "date")
      return element.date === state.active.name && element.isDone;

    return element.project === state.active._id && element.isDone;
  });
  return (
    <div className="done_tasks">
      {tasks.map((element) => {
        return (
          <div key={element._id} className="task">
            <label>
              <input
                type="checkbox"
                checked
                onChange={() => reducer.updateTask(element)}
              />
              <span>{element.description}</span>
            </label>
            <i
              className="fa-solid fa-x"
              onClick={(e) => {
                e.stopPropagation();
                reducer.deleteTask(element);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DoneTasks;
