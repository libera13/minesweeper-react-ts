import smiley1 from "../assets/FaceHappy.png";
import smiley2 from "../assets/FaceOFace.png";
import smiley3 from "../assets/FaceLose.png";
import smiley from "../assets/FaceWon.png";

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
  open,
  visible,
  flag,
}
export type Cell = { value: CellValue; state: CellState };
