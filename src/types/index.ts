export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}
export enum CellState {
  notClicked,
  clicked,
  flag,
}
export enum Level {
  beginner,
  intermediate,
  expert,
  custom
}
export type Cell = { value: CellValue; state: CellState, red: boolean };
