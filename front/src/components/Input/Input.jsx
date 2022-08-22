import "./Input.css";

function Input(props) {
  const { type, errors, name, register, label, validator, message } = props;
  return (
    <div className={`form_group ${errors[name] ? "invalid" : ""}`}>
      <label>
        {label}
        <input type={type} placeholder={label} {...register(name, validator)} />
      </label>
      {errors[name] && <i className="fa-solid fa-circle-exclamation" />}
      {errors[name] && <div className="error">{message}</div>}
    </div>
  );
}

export default Input;
