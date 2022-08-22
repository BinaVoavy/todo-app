import { useState } from "react";
import AddProject from "./AddProject/AddProject";
import AddProjectForm from "./AddProjectForm/AddProjectForm";
import ProjectsList from "./ProjectsList/ProjectsList";
import DateMenu from "./DateMenu/DateMenu";
import "./SideBar.css";

function SideBar() {
  const [addProject, setAddProject] = useState(false);
  return (
    <div className="app_left">
      <DateMenu />
      <ProjectsList />
      {addProject && <AddProjectForm cancel={() => setAddProject(false)} />}
      <AddProject onClick={() => setAddProject(!addProject)} />
    </div>
  );
}

export default SideBar;
