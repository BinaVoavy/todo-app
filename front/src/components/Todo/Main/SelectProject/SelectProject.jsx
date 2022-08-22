import "./SelectProject.css";
import { useEffect, useState } from "react";
import { useStates } from "../../../../context/stateContext";

function Select({ setSelect }) {
  const [change, setChange] = useState(false);
  const [selected, setSelected] = useState(0);
  const options = useStates().projects;
  let value = options[selected];

  useEffect(() => {
    setSelect(value);
  }, [setSelect, value]);

  const handleChange = (e) => {
    setSelected(+e.target.getAttribute("data-value"));
    setChange(!change);
    value = options[+e.target.getAttribute("data-value")];
    setSelect(value);
  };

  return (
    <div className="select">
      <div className="select_value" onClick={() => setChange(!change)}>
        {options[selected].name}
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
                {element.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Select;
