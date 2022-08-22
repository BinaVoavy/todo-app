import { useReducer } from "../../../../context/stateContext";

function DateMenu() {
  const reducer = useReducer();
  return (
    <ul>
      <li
        onClick={() => {
          reducer.setActive({ type: "date", name: "Inbox" });
        }}
      >
        <div className="menu_item">
          <i className="fa-solid fa-inbox" /> Inbox
        </div>
      </li>
      <li
        onClick={() => {
          reducer.setActive({ type: "date", name: "Today" });
        }}
      >
        <div className="menu_item">
          <i className="fa-solid fa-calendar" />
          Today
        </div>
      </li>
      <li
        onClick={() => {
          reducer.setActive({ type: "date", name: "Next 7 day" });
        }}
      >
        <div className="menu_item">
          <i className="fa-solid fa-calendar-days" /> Next 7 today
        </div>
      </li>
    </ul>
  );
}

export default DateMenu;
