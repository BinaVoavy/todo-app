import { useReducer } from "../../../../../context/stateContext";
import "./ProjectItem.css";

function Project({ data }) {
  const value = { type: "project", ...data };
  const reducer = useReducer();
  return (
    <li onClick={() => reducer.setActive(value)}>
      <div className="menu_item project_item">
        {data.name}
        <i
          className="fa-solid fa-x"
          onClick={(e) => {
            e.stopPropagation();
            reducer.deleteProject(data);
          }}
        />
      </div>
    </li>
  );
}

export default Project;
