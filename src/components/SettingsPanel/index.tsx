import React, { useState } from "react";
import "./SettingsPanel.scss";

interface SettingsPanelProps {
  onSettingsChange: (col: number, row: number, bombs: number) => any;
}

const SettingsPanel: React.FunctionComponent<SettingsPanelProps> = ({
  onSettingsChange,
}) => {
  const [lowValue, setLowValue] = useState();
  const [mediumValue, setMediumValue] = useState();
  const [highValue, setHighValue] = useState();

  // TODO 1: set constraints to inputs
  // TODO 2: change vars names in Settings Panel
  // TODO 3: Add levels: green, intermediate, expert

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSettingsChange(lowValue, mediumValue, highValue);
  };
  const handleLowChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLowValue(e.currentTarget.value);
  };
  const handleMediumChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMediumValue(e.currentTarget.value);
  };
  const handleHighChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHighValue(e.currentTarget.value);
  };
  return (
    <div className={`SettingsPanel`}>
      <form onSubmit={handleSubmit}>
        <label>
          Column
          <input type="number" value={lowValue} onChange={handleLowChange} />
        </label>
        <label>
          Rows
          <input
            type="number"
            value={mediumValue}
            onChange={handleMediumChange}
          />
        </label>{" "}
        <label>
          Bombs
          <input type="number" value={highValue} onChange={handleHighChange} />
        </label>
        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
};
export default SettingsPanel;
