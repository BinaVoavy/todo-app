import Main from "./Main/Main";
import Navbar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import "./Todo.css";

function Todo() {
  return (
    <div className="container">
      <div className="app_container">
        <Navbar />
        <div className="app_body">
          <SideBar />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Todo;
