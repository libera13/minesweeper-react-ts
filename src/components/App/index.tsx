import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import { generateCells } from "../../utils";
import Button from "../Button";
import FaceHappy from "../../assets/FaceHappy.png";
import FaceOFace from "../../assets/FaceOFace.png";
import FaceWon from "../../assets/FaceWon.png";
import FaceLose from "../../assets/FaceLose.png";
import "./App.scss";
import {CellState} from "../../types";

const App: React.FunctionComponent = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(FaceHappy);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);

  const handleMouseDown = () => {
    setFace(FaceOFace);
  };
  const handleMouseUp = () => {
    setFace(FaceHappy);
  };
  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    console.log(rowParam, colParam);
    // start game
    if (!live) {
      setLive(true);
    }
  };
  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault()
    const currentCells = cells.slice()
    const currentCell = cells[rowParam][colParam]
    // start game
    if (currentCell.state === CellState.notClicked) {
      // currentCell.state = CellState.flag
      currentCells[rowParam][colParam].state = CellState.flag
      setCells(currentCells)
    } else if (currentCell.state === CellState.flag) {
      // currentCell.state = CellState.notClicked
      currentCells[rowParam][colParam].state = CellState.notClicked
      setCells(currentCells)
    }
  };

  useEffect(() => {
    if (live) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  const handleFaceClick = (): void => {
    if (live) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
    }
  };

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
            onClick={handleCellClick}
            onContext={handleCellContext}
          />
        );
      })
    );
  };

  return (
    <div className={"App"}>
      <div className="Header">
        <NumberDisplay value={0} />
        <div className="Face" onClick={handleFaceClick}>
          <img src={face} alt="" />
        </div>
        <NumberDisplay value={time} />
      </div>
      <div
        className="Body"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {renderCells()}
      </div>
    </div>
  );
};
export default App;
