import { useForm } from "react-hook-form";
import { useReducer } from "../../../../context/stateContext";
import Loading from "../../../Loading/Loading";
import "./AddProjectForm.css";

function AddProjectForm({ cancel }) {
  const { handleSubmit, formState, register, reset } = useForm();
  const { isSubmitting } = formState;
  const reducer = useReducer();
  const onSubmit = (data) => {
    reducer.addProject(data.projectName);
    reset();
  };
  return (
    <form className="add_project_form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="projectName"
        placeholder="Name your project"
        {...register("projectName", { required: true })}
      />
      <div className="button_group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loading /> : "Add project"}
        </button>
        <span onClick={cancel}>Cancel</span>
      </div>
    </form>
  );
}

export default AddProjectForm;
