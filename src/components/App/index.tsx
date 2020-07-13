import React, { useState } from "react";
import "./App.scss";
import NumberDisplay from "../NumberDisplay";
import smiley1 from "../../assets/smiley1.png";
import { generateCells } from "../../utils";
import Button from "../Button";

const App: React.FunctionComponent = () => {
  const [cells, setCells] = useState(generateCells());

    console.log(cells)
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        return <Button key={`${rowIndex}-${colIndex}`} />;
      })
    );
  };


  return (
    <div className={"App"}>
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <img src={smiley1} alt="" />
        </div>
        <NumberDisplay value={12} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};
export default App;
