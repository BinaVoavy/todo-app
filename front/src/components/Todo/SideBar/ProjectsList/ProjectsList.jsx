import "./ProjectsList.css";
import ProjectItem from "./ProjectItem/ProjectItem";
import { useStates } from "../../../../context/stateContext";
import { useEffect } from "react";

function Projects() {
  useEffect(() => {});
  const state = useStates();
  return (
    <>
      <div className="menu_item projects">
        <i className="fa-solid fa-angle-down" />
        Projects
      </div>
      <ul>
        {state.projects.map((element) => {
          return <ProjectItem key={element._id} data={element} />;
        })}
      </ul>
    </>
  );
}

export default Projects;
