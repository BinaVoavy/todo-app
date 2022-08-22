import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useReducer } from "../../context/stateContext";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";
import "./Login.css";
function Login() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onTouched",
  });
  const reducer = useReducer();
  const { isSubmitting, errors } = formState;
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://pacific-wildwood-08962.herokuapp.com/login",
        data
      );

      localStorage.setItem("todo_token", res.data.token);
      setError("");
      await reducer.login(res.data);
    } catch (err) {
      if (err.response && err.response.status === 400)
        setError("Wrong username or password");
      else {
        console.log(err);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    }
  };
  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form_header">Log in</h1>
      <div className="form_body">
        {error && <div className="error_message">{error}</div>}
        <Input
          type="text"
          errors={errors}
          register={register}
          name="username"
          label="Username"
          message="Username is required"
          validator={{ required: true }}
        />
        <Input
          type="password"
          errors={errors}
          register={register}
          name="password"
          label="Password"
          message="Password is required"
          validator={{
            required: true,
          }}
        />
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loading /> : "Log in"}
        </button>
        <div className="singup_text">
          Don't have a account sign up<Link to="/signup"> here</Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
