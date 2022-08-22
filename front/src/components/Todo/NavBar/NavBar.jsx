import { useStates, useReducer } from "../../../context/stateContext";
import "./NavBar.css";

function Navbar() {
  const { user } = useStates();
  const { logout } = useReducer();
  return (
    <div className="app_header">
      <div className="logo">
        <i className="fas fa-tasks" />
      </div>
      <div className="user_info">
        {user.username} <i className="fas fa-power-off" onClick={logout} />
      </div>
    </div>
  );
}

export default Navbar;
