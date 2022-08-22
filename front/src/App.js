import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Signup from "./components/Signup/Signup";
import Todo from "./components/Todo/Todo";
import { useReducer, useStates } from "./context/stateContext";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const state = useStates();
  const reducer = useReducer();
  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("todo_token");
      if (token) {
        try {
          const res = await axios.get(
            "https://pacific-wildwood-08962.herokuapp.com/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const user = res.data;
          user.token = token;
          await reducer.login(user);
        } catch (error) {
          if (error.response && error.response.status === 401) reducer.logout();
          else {
            console.log(error);
            toast.error("Something went wrong", {
              autoClose: 10000,
              hideProgressBar: true,
            });
          }
        }
      }
    }
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={state.user ? <Todo /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!state.user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!state.user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
