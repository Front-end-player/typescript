import exp from "constants";

export enum ChessType {
  red,
  black,
  none
}

export enum Difficulty {
  easy = 3,
  medium = 6,
  difficult = 9
}

export interface ChessProps {
  type: ChessType,
  onClick?: ()=> void,
  chessSize?: number
}

export enum GameStatus {
  draw = '平局',
  redWin = '红棋胜利',
  blackWin = '黑棋胜利',
  gaming = '正在游戏中'
}
