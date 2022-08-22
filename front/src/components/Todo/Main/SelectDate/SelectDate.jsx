import "./SelectDate.css";
import { useEffect, useState } from "react";

function SelectDate({ setSelect }) {
  const [change, setChange] = useState(false);
  const [selected, setSelected] = useState(0);
  const options = [
    {
      display: (
        <>
          <i className="fa-solid fa-calendar" /> Today
        </>
      ),
      value: "Today",
    },
    {
      display: (
        <>
          <i className="fa-solid fa-inbox" /> Inbox
        </>
      ),
      value: "Inbox",
    },
    {
      display: (
        <>
          <i className="fa-solid fa-calendar-days" /> Next 7 today
        </>
      ),
      value: "Next 7 day",
    },
  ];
  let value = options[selected].value;
  useEffect(() => {
    setSelect(value);
  }, [setSelect, value]);

  const handleChange = (e) => {
    setSelected(+e.target.getAttribute("data-value"));
    setChange(!change);
    value = options[+e.target.getAttribute("data-value")].value;
    setSelect(value);
  };

  return (
    <div className="select">
      <div className="select_value" onClick={() => setChange(!change)}>
        {options[selected].display}
      </div>
      {change && (
        <div className="select_option">
          {options.map((element, index) => {
            return (
              <div
                className="select_item"
                data-value={index}
                onClick={handleChange}
                key={"select" + index}
              >
                {element.display}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default SelectDate;
