import { useForm } from "react-hook-form";
import { useReducer, useStates } from "../../../../context/stateContext";
import SelectDate from "../SelectDate/SelectDate";
import SelectProject from "../SelectProject/SelectProject";
import Loading from "../../../Loading/Loading";
import "./AddTaskForm.css";
function AddTaskForm({ cancel }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting } = formState;
  const activeType = useStates().active.type;
  const reducer = useReducer();
  let selectValue;
  const onSubmit = (data) => {
    reducer.addTask({ description: data.description, selectValue });
    reset();
  };
  const setSelect = (value) => {
    selectValue = value;
  };
  return (
    <form className="add_task_form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="task_description"
        placeholder="What you want to do?"
        {...register("description", { required: true })}
      />
      <div className="task_button_group">
        <div>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading /> : "Add task"}
          </button>
          <span onClick={cancel}>Cancel</span>
        </div>
        {activeType === "project" ? (
          <SelectDate setSelect={setSelect} />
        ) : (
          <SelectProject setSelect={setSelect} />
        )}
      </div>
    </form>
  );
}

export default AddTaskForm;
