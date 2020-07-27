import React, { useEffect, useState } from "react";
import "./SettingsPanel.scss";
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

  // TODO 1: set constraints to inputs
  // TODO 2: Add style to settings panel

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSettingsChange(colValue, rowValue, bombValue);
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
    if (level == Level.beginner) {
      setColValue(9);
      setRowValue(9);
      setBombValue(10);
    } else if (level == Level.intermediate) {
      setColValue(13);
      setRowValue(15);
      setBombValue(40);
    } else if (level == Level.expert) {
      setColValue(16);
      setRowValue(30);
      setBombValue(99);
    }
  }, [level]);

  return (
    <div className={`SettingsPanel`}>
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
          Column
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
        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
};
export default SettingsPanel;
