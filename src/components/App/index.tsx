import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import {generateCells, openEmptyCells} from "../../utils";
import Button from "../Button";
import FaceHappy from "../../assets/FaceHappy.png";
import FaceOFace from "../../assets/FaceOFace.png";
import "./App.scss";
import { CellState, CellValue } from "../../types";
import { NUM_OF_BOMBS } from "../../constants";

const App: React.FunctionComponent = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(FaceHappy);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);
  const [bombCounter, setBombCounter] = useState(NUM_OF_BOMBS);

  // handle face change on click
  const handleMouseDown = () => {
    setFace(FaceOFace);
  };
  const handleMouseUp = () => {
    setFace(FaceHappy);
  };
  // handle cell click
  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    // start game
    if (!live) {
      setLive(true);
      // TODO make sure that first click will not be bomn
    }
    let newCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if ([CellState.flag, CellState.clicked].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      // TODO take care of this
    } else if (currentCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowParam, colParam)
      setCells(newCells)
      //    TODO open everything
    } else {
      newCells[rowParam][colParam].state = CellState.clicked;
      setCells(newCells);
    }
  };
  // handle add flag click
  const handleCellContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const currentCells = [...cells];
    const currentCell = cells[rowParam][colParam];

    if (!live) {
      return;
    }
    //show flag
    if (currentCell.state === CellState.notClicked) {
      // currentCell.state = CellState.flag
      currentCells[rowParam][colParam].state = CellState.flag;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    }
    //hide flag
    else if (currentCell.state === CellState.flag) {
      // currentCell.state = CellState.notClicked
      currentCells[rowParam][colParam].state = CellState.notClicked;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  // Set Timer
  useEffect(() => {
    if (live && time < 999) {
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
        <NumberDisplay value={bombCounter} />
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
