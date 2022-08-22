import axios from "axios";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import "./Signup.css";
import { toast } from "react-toastify";
function Signup() {
  const { register, handleSubmit, formState, watch, reset } = useForm({
    mode: "onTouched",
  });
  const { errors } = formState;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => {
    delete data.confirmPassword;
    axios
      .post("https://pacific-wildwood-08962.herokuapp.com/signup", data)
      .then((res) => {
        console.log(res);
        setError("");
        setSuccess(true);
        reset();
      })
      .catch((err) => {
        setSuccess(false);
        if (err.response.status === 400) setError(err.response.data.message);
        else {
          console.log(err);
          toast.error("Something went wrong", {
            autoClose: 10000,
            hideProgressBar: true,
          });
        }
      });
  };
  return (
    <form className="form_container" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form_header">Sign Up</h1>
      <div className="form_body">
        {error && <div className="error_message">{error}</div>}
        {success && <div className="success_message">Sign up success</div>}
        <Input
          type="text"
          errors={errors}
          register={register}
          name="username"
          label="Username"
          message="Username must be at least 5 caracter"
          validator={{ required: true, pattern: /^[a-zA-Z0-9]{4,20}$/ }}
        />
        <Input
          type="text"
          errors={errors}
          register={register}
          name="email"
          label="Email"
          message="Email must be a valid email"
          validator={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          }}
        />
        <Input
          type="password"
          errors={errors}
          register={register}
          name="password"
          label="Password"
          message="Password should contain 8 to 20 character"
          validator={{
            required: true,
            minLength: 8,
            maxLength: 20,
          }}
        />
        <Input
          type="password"
          errors={errors}
          register={register}
          name="confirmPassword"
          label="Confirm Password"
          message="Password doesn't match"
          validator={{
            validate: (value) =>
              value === password.current || "The passwords do not match",
          }}
        />
        <button type="submit">Sign Up</button>
        <div className="singup_text">
          Already have a account log in <Link to="/login"> here</Link>
        </div>
      </div>
    </form>
  );
}

export default Signup;
