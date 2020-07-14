import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import { generateCells } from "../../utils";
import Button from "../Button";
import FaceHappy from "../../assets/FaceHappy.png"
import FaceOFace from "../../assets/FaceOFace.png"
import FaceWon from "../../assets/FaceWon.png"
import FaceLose from "../../assets/FaceLose.png"
import "./App.scss";


const App: React.FunctionComponent = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(FaceHappy);


  useEffect(() => {
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)

      return function cleanup() {
          window.removeEventListener("mousedown", handleMouseDown)
          window.removeEventListener("mouseup", handleMouseUp)
      }
    },[])

    const handleMouseDown = () => {
      setFace(FaceOFace)
    }
    const handleMouseUp = () => {
      setFace(FaceHappy)
    }

  console.log(cells);
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <Button
            key={`${rowIndex}-${colIndex}`}
            state={cell.state}
            value={cell.value}
            row={rowIndex}
            col={colIndex}
          />
        );
      })
    );
  };

    return (
    <div className={"App"}>
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face">
          <img src={face} alt="" />
        </div>
        <NumberDisplay value={12} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};
export default App;
