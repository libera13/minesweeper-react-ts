import { MAX_ROWS, MAX_COLS } from "../constants";
import { Cell, CellTypes, CellValue } from "../types";

export const generateCells = () => {
  const cells: Cell[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellTypes.open,
      });
    }
  }
  return cells;
};
