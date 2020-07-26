import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import { generateCells, openEmptyCells } from "../../utils";
import Button from "../Button";
import FaceHappy from "../../assets/FaceHappy.png";
import FaceOFace from "../../assets/FaceOFace.png";
import FaceWon from "../../assets/FaceWon.png";
import FaceLose from "../../assets/FaceLose.png";
import "./App.scss";
import { Cell, CellState, CellValue } from "../../types";
import { MAX_COLS, MAX_ROWS, NUM_OF_BOMBS } from "../../constants";

const App: React.FunctionComponent = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState(FaceHappy);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);
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
    let newCells = cells.slice();
    let currentCell = newCells[rowParam][colParam];

    if (!live) {
      while (currentCell.value === CellValue.bomb) {
        newCells = generateCells();
        currentCell = newCells[rowParam][colParam];
      }
      setLive(true);
    }

    if ([CellState.flag, CellState.clicked].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = openAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.clicked;
    }

    // Check if all correct cells are open
    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = newCells[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.notClicked
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells = newCells.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flag,
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);
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

  useEffect(() => {
    if (hasLost) {
      setFace(FaceLose);
      setLive(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setFace(FaceWon);
      setLive(false);
    }
  }, [hasWon]);

  const handleFaceClick = (): void => {
    if (live || hasLost) {
      setLive(false);
      setTime(0);
      setCells(generateCells());
      setHasLost(false);
      setHasWon(false);
    }
  };

  const openAllBombs = (): Cell[][] => {
    const currentCells = [...cells];
    return currentCells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.clicked,
          };
        }
        return cell;
      })
    );
  };
  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return (
          <Button
            key={`${rowIndex}-${colIndex}`}
            state={cell.state}
            value={cell.value}
            red={cell.red}
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
