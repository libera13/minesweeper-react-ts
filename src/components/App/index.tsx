import React, { useEffect, useState } from "react";
import NumberDisplay from "../NumberDisplay";
import Button from "../Button";
import SettingsPanel from "../SettingsPanel";
import { generateCells, openEmptyCells } from "../../utils";
import { Cell, CellState, CellValue } from "../../types";
import { MAX_COLS, MAX_ROWS, NUM_OF_BOMBS } from "../../constants";
import FaceHappy from "../../assets/FaceHappy.png";
import FaceOFace from "../../assets/FaceOFace.png";
import FaceWon from "../../assets/FaceWon.png";
import FaceLose from "../../assets/FaceLose.png";
import "./App.scss";

const App: React.FunctionComponent = () => {
  const [numOfCols, setNumOfCols] = useState(MAX_COLS);
  const [numOfRows, setNumOfRows] = useState(MAX_ROWS);
  const [numOfBombs, setNumOfBombs] = useState(NUM_OF_BOMBS);
  const [cells, setCells] = useState(
    generateCells(numOfCols, numOfRows, numOfBombs)
  );
  const [face, setFace] = useState(FaceHappy);
  const [time, setTime] = useState(0);
  const [live, setLive] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [bombCounter, setBombCounter] = useState(numOfBombs);

  // handle face change on click
  const handleMouseDown = () => {
    setFace(FaceOFace);
  };
  const handleMouseUp = () => {
    setFace(FaceHappy);
  };
  // handle cell click
  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    if (hasWon || hasLost) {
      return;
    }

    // start game
    let newCells = cells.slice();
    let currentCell = newCells[rowParam][colParam];

    if (!live) {
      while (currentCell.value === CellValue.bomb) {
        newCells = generateCells(numOfCols, numOfRows, numOfBombs);
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
      newCells = openEmptyCells(
        newCells,
        rowParam,
        colParam,
        numOfCols,
        numOfRows
      );
    } else {
      newCells[rowParam][colParam].state = CellState.clicked;
    }

    // Check if all correct cells are open
    let safeOpenCellsExists = false;
    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
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

  useEffect(() => {
    const newCells = generateCells(numOfCols, numOfRows, numOfBombs);
    setCells(newCells)
  }, [numOfCols, numOfRows, numOfBombs]);

  const handleFaceClick = (): void => {
    if (live || hasLost || hasWon) {
      setLive(false);
      setTime(0);
      setCells(generateCells(numOfCols, numOfRows, numOfBombs));
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

  const handleSettingsChange = (col: number, row: number, bombs: number) => {
    setNumOfCols(col);
    setNumOfRows(row);
    setNumOfBombs(bombs);
    setBombCounter(bombs);
  };

  return (
    <div className={"App"}>
      <SettingsPanel onSettingsChange={handleSettingsChange} />
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
        style={{gridTemplateColumns: `repeat(${numOfCols}, 1fr)`, gridTemplateRows: `repeat(${numOfRows}, 1fr)`}}
      >
        {renderCells()}
      </div>
    </div>
  );
};
export default App;
