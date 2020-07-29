import React, { useEffect, useState } from "react";
import "./SettingsPanel.scss";
import "../../styles/index.scss"
import { Level } from "../../types";

interface SettingsPanelProps {
  onSettingsChange: (col: number, row: number, bombs: number) => any;
}

const SettingsPanel: React.FunctionComponent<SettingsPanelProps> = ({
  onSettingsChange,
}) => {
  const [colValue, setColValue] = useState();
  const [rowValue, setRowValue] = useState();
  const [bombValue, setBombValue] = useState();
  const [level, setLevel] = useState();

  // TODO 1: Add style to some fancy animations to settings panel

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if ( (colValue > 0 && rowValue > 0 && bombValue >= 0) && (colValue*rowValue > bombValue)){
      onSettingsChange(colValue, rowValue, bombValue);
    } else {
      alert("incorrect values")
    }
  };
  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setColValue(e.currentTarget.value);
  };
  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRowValue(e.currentTarget.value);
  };
  const handleBombChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBombValue(e.currentTarget.value);
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLevel(parseInt(e.currentTarget.value));
  };

  useEffect(() => {
    if (level === Level.beginner) {
      setColValue(9);
      setRowValue(9);
      setBombValue(10);
    } else if (level === Level.intermediate) {
      setColValue(13);
      setRowValue(15);
      setBombValue(40);
    } else if (level === Level.expert) {
      setColValue(16);
      setRowValue(30);
      setBombValue(99);
    }
  }, [level]);

  return (
    <div className={`SettingsPanel`}>
      <h4>     :)    </h4>
      <div className={"FlexContainer"}>
        <tr style={{ display: "flex", flexDirection: "column" }}>
          <td>
            <input
              type="radio"
              name="beginner"
              value={Level.beginner}
              checked={level === Level.beginner}
              onChange={handleOptionChange}
            />
            Beginner
          </td>
          <td>
            <input
              type="radio"
              name="intermediate"
              value={Level.intermediate}
              checked={level === Level.intermediate}
              onChange={handleOptionChange}
            />
            Intermediate
          </td>
          <td>
            <input
              type="radio"
              name="expert"
              value={Level.expert}
              checked={level === Level.expert}
              onChange={handleOptionChange}
            />
            Expert
          </td>
          <td>
            <input
              type="radio"
              name="custom"
              value={Level.custom}
              checked={level === Level.custom}
              onChange={handleOptionChange}
            />
            Custom
          </td>
        </tr>
        <form onSubmit={handleSubmit}>
          <label>
            Columns
            <input
              type="number"
              value={colValue}
              onChange={handleColChange}
              disabled={level !== Level.custom}
            />
          </label>
          <label>
            Rows
            <input
              type="number"
              value={rowValue}
              onChange={handleRowChange}
              disabled={level !== Level.custom}
            />
          </label>{" "}
          <label>
            Bombs
            <input
              type="number"
              value={bombValue}
              onChange={handleBombChange}
              disabled={level !== Level.custom}
            />
          </label>
          <input type="submit" className={"PrimaryButton LeftCornerButton"} value={"Submit"} />
        </form>
      </div>
    </div>
  );
};
export default SettingsPanel;
