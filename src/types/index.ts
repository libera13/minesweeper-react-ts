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
export enum CellTypes {
  open,
  visible,
  flag,
}
export type Cell = { value: CellValue; state: CellTypes };
