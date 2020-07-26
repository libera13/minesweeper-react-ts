import {MAX_COLS, MAX_ROWS, NUM_OF_BOMBS} from "../constants";
import {Cell, CellState, CellValue} from "../types";

export const generateCells = () => {
  let cells: Cell[][] = [];

  // generate cells
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        red: false,
        value: CellValue.none,
        state: CellState.notClicked,
      });
    }
  }

  // generate bombs
  let bombsPlaced = 0;
  while (bombsPlaced < NUM_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLS);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }
          return cell;
        })
      );
      bombsPlaced++;
    }
  }

  // calculate the numbers for each cell
  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];

      if (currentCell.value === CellValue.bomb) {
        continue;
      }
      let numberOfBombs = 0;

      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = grabAllAdjacentCells(cells, rowIndex, colIndex);

      if (topLeftCell && topLeftCell.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs,
        };
      }
    }
  }

  return cells;
};

export const openEmptyCells = (
  cells: Cell[][],
  rowIndex: number,
  colIndex: number
): Cell[][] => {
  let newCells = [...cells];
  newCells[rowIndex][colIndex].state = CellState.clicked;
  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = grabAllAdjacentCells(cells, rowIndex, colIndex);

  if (
      topLeftCell?.state === CellState.notClicked &&
      topLeftCell.value !== CellValue.bomb
  ) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex - 1, colIndex - 1);
    } else {
      newCells[rowIndex - 1][colIndex - 1].state = CellState.clicked;
    }
  }

  if (topCell?.state === CellState.notClicked && topCell.value !== CellValue.bomb) {
    if (topCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex - 1, colIndex);
    } else {
      newCells[rowIndex - 1][colIndex].state = CellState.clicked;
    }
  }

  if (
      topRightCell?.state === CellState.notClicked &&
      topRightCell.value !== CellValue.bomb
  ) {
    if (topRightCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex - 1, colIndex + 1);
    } else {
      newCells[rowIndex - 1][colIndex + 1].state = CellState.clicked;
    }
  }

  if (leftCell?.state === CellState.notClicked && leftCell.value !== CellValue.bomb) {
    if (leftCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex, colIndex - 1);
    } else {
      newCells[rowIndex][colIndex - 1].state = CellState.clicked;
    }
  }

  if (
      rightCell?.state === CellState.notClicked &&
      rightCell.value !== CellValue.bomb
  ) {
    if (rightCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex, colIndex + 1);
    } else {
      newCells[rowIndex][colIndex + 1].state = CellState.clicked;
    }
  }

  if (
      bottomLeftCell?.state === CellState.notClicked &&
      bottomLeftCell.value !== CellValue.bomb
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex + 1, colIndex - 1);
    } else {
      newCells[rowIndex + 1][colIndex - 1].state = CellState.clicked;
    }
  }

  if (
      bottomCell?.state === CellState.notClicked &&
      bottomCell.value !== CellValue.bomb
  ) {
    if (bottomCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex + 1, colIndex);
    } else {
      newCells[rowIndex + 1][colIndex].state = CellState.clicked;
    }
  }

  if (
      bottomRightCell?.state === CellState.notClicked &&
      bottomRightCell.value !== CellValue.bomb
  ) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openEmptyCells(newCells, rowIndex + 1, colIndex + 1);
    } else {
      newCells[rowIndex + 1][colIndex + 1].state = CellState.clicked;
    }
  }

  return newCells;
};

export const grabAllAdjacentCells = (
  cells: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  const topLeftCell = getTopLeftCell(rowIndex, colIndex, cells);
  const topCell = getTopCell(rowIndex, colIndex, cells);
  const topRightCell = getTopRightCell(rowIndex, colIndex, cells);
  const leftCell = getLeftCell(rowIndex, colIndex, cells);
  const rightCell = getRightCell(rowIndex, colIndex, cells);
  const bottomLeftCell = getBottomLeftCell(rowIndex, colIndex, cells);
  const bottomCell = getBottomCell(rowIndex, colIndex, cells);
  const bottomRightCell = getBottomRightCell(rowIndex, colIndex, cells);

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

const getBottomCell = (rowIndex: number, colIndex: number, cells: Cell[][]) => {
  return rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
};
const getTopLeftCell = (
  rowIndex: number,
  colIndex: number,
  cells: Cell[][]
) => {
  return rowIndex > 0 && colIndex > 0
    ? cells[rowIndex - 1][colIndex - 1]
    : null;
};
const getTopCell = (rowIndex: number, colIndex: number, cells: Cell[][]) => {
  return rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
};
const getTopRightCell = (
  rowIndex: number,
  colIndex: number,
  cells: Cell[][]
) => {
  return rowIndex > 0 && colIndex < MAX_COLS - 1
    ? cells[rowIndex - 1][colIndex + 1]
    : null;
};

const getLeftCell = (rowIndex: number, colIndex: number, cells: Cell[][]) => {
  return colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
};

const getRightCell = (rowIndex: number, colIndex: number, cells: Cell[][]) => {
  return colIndex < MAX_COLS - 1 ? cells[rowIndex][colIndex + 1] : null;
};

const getBottomLeftCell = (
  rowIndex: number,
  colIndex: number,
  cells: Cell[][]
) => {
  return rowIndex < MAX_ROWS - 1 && colIndex > 0
    ? cells[rowIndex + 1][colIndex - 1]
    : null;
};

const getBottomRightCell = (
  rowIndex: number,
  colIndex: number,
  cells: Cell[][]
) => {
  return rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLS - 1
    ? cells[rowIndex + 1][colIndex + 1]
    : null;
};
