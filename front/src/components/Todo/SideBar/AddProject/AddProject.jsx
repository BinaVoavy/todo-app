import "./AddProject.css";

function AddProject({ onClick }) {
  return (
    <div onClick={onClick} className="add_project">
      <i className="fa-solid fa-plus" /> Add Project
    </div>
  );
}

export default AddProject;
