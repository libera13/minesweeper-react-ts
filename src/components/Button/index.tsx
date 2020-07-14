import React from "react";
import "./Button.scss";
import { CellState, CellValue } from "../../types";
import mine from "../../assets/mine.png";
import flag from "../../assets/flag.png";

interface ButtonProps {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  row,
  col,
  state,
  value,
}) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <img src={mine} alt="mine" />;
      }
      return value;
    } else if (state === CellState.flag) {
      return <img src={flag} alt="flag" />;
    }
    return null;
  };
  return (
    <div
      className={`Button ${
        state === CellState.visible ? "visible" : ""
      } value-${value}`}
    >
      {renderContent()}
    </div>
  );
};
export default Button;
