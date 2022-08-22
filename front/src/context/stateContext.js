import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const State = React.createContext();
const Reducer = React.createContext();

const SERVER = "https://pacific-wildwood-08962.herokuapp.com";

export function useStates() {
  return useContext(State);
}
export function useReducer() {
  return useContext(Reducer);
}

export function StateContext({ children }) {
  const [state, setState] = useState({
    user: localStorage.getItem("todo_token"),
    tasks: [],
    projects: [],
    active: {},
  });
  const reducer = {
    addProject: async (value) => {
      const tmp_state = { ...state };
      const name = value;
      const owner = tmp_state.user._id;
      try {
        const res = await axios.post(
          `${SERVER}/project`,
          {
            name,
            owner,
          },
          {
            headers: { Authorization: `Bearer ${tmp_state.user.token}` },
          }
        );
        tmp_state.projects.push(res.data);
        setState(tmp_state);
      } catch (error) {
        if (error.response.status === 401) this.logout();
        else {
          console.log(error);
          toast.error("Something went wrong", {
            autoClose: 10000,
            hideProgressBar: true,
          });
        }
      }
    },
    deleteProject: async (value) => {
      try {
        const tmp_state = { ...state };
        await axios.delete(`${SERVER}/project/${value._id}`, {
          headers: { Authorization: `Bearer ${tmp_state.user.token}` },
        });

        const tmp_project = tmp_state.projects.filter((element) => {
          return element._id !== value._id;
        });
        tmp_state.tasks = tmp_state.tasks.filter((element) => {
          return element.project._id !== value._id;
        });
        tmp_state.projects = tmp_project;
        setState(tmp_state);
        if (
          tmp_state.active.type === "project" &&
          tmp_state.active._id === value._id
        )
          tmp_state.active = { type: "date", name: "Today" };
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    },
    setActive: (value) => {
      const tmp_state = { ...state };
      tmp_state.active = value;
      setState(tmp_state);
    },
    updateTask: async (value) => {
      const tmp_state = { ...state };
      try {
        await axios.put(
          `${SERVER}/task`,
          { _id: value._id },
          {
            headers: { Authorization: `Bearer ${tmp_state.user.token}` },
          }
        );
        tmp_state.tasks = tmp_state.tasks.map((element) => {
          if (element._id === value._id) {
            element.isDone = !element.isDone;
          }
          return element;
        });
        setState({ ...tmp_state });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    },
    deleteTask: async (value) => {
      const tmp_state = { ...state };
      try {
        await axios.delete(`${SERVER}/task/${value._id}`, {
          headers: { Authorization: `Bearer ${tmp_state.user.token}` },
        });
        tmp_state.tasks = tmp_state.tasks.filter((element) => {
          return element._id !== value._id;
        });
        setState(tmp_state);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    },
    addTask: async (value) => {
      const tmp_state = { ...state };
      try {
        if (tmp_state.active.type === "project") {
          const res = await axios.post(
            `${SERVER}/task`,
            {
              description: value.description,
              date: value.selectValue,
              owner: tmp_state.user._id,
              project: tmp_state.active._id,
            },
            {
              headers: { Authorization: `Bearer ${tmp_state.user.token}` },
            }
          );
          tmp_state.tasks.push(res.data);
        } else {
          const res = await axios.post(
            `${SERVER}/task`,
            {
              description: value.description,
              date: tmp_state.active.name,
              owner: tmp_state.user._id,
              project: value.selectValue._id,
            },
            {
              headers: { Authorization: `Bearer ${tmp_state.user.token}` },
            }
          );
          tmp_state.tasks.push(res.data);
        }
        setState(tmp_state);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    },
    login: async (value) => {
      const tmp_state = { ...state };
      try {
        tmp_state.user = value;
        const projects = await axios.get(`${SERVER}/project`, {
          headers: { Authorization: `Bearer ${tmp_state.user.token}` },
        });
        tmp_state.projects = projects.data;
        const tasks = await axios.get(`${SERVER}/task`, {
          headers: { Authorization: `Bearer ${tmp_state.user.token}` },
        });
        tmp_state.tasks = tasks.data;
        tmp_state.active = { name: "Today", type: "date" };
        setState(tmp_state);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          autoClose: 10000,
          hideProgressBar: true,
        });
      }
    },
    logout: () => {
      const tmp_state = { ...state };
      tmp_state.user = null;
      setState(tmp_state);
      localStorage.removeItem("todo_token");
    },
  };

  return (
    <Reducer.Provider value={reducer}>
      <State.Provider value={state}>{children}</State.Provider>
    </Reducer.Provider>
  );
}
