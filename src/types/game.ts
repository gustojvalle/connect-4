export type Player = 1 | 2;
export type Board = Player[][];
export type IncrementValue = number[];
export type Increment = {
  diagonal1Up: IncrementValue;
  diagonal1Down: IncrementValue;
  diagonal2Up: IncrementValue;
  diagonal2Down: IncrementValue;
};
export type DiagonalCheck = (
  row: number,
  col: number,
  player: number,
  board: Array<Array<number>>,
  stack: Stack,
  direction: "diagonal1Down" | "diagonal1Up" | "diagonal2Down" | "diagonal2Up",
  increment: Increment
) => boolean;

export interface Stack {
  [stackOne: string]: number[];
}

export type PlayerInfo = { name: string; color: string };
export interface PlayersInfo {
  [player: string]: PlayerInfo;
}

export type Stats = {
  [key: string]: number;
};