import { boardCols } from "const";
import { atom } from "recoil";
import { Board, Player, PlayersInfo, Stats } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});

export const playersInfoState = atom<PlayersInfo>({
  key: "playersInfoState",
  default: {
    player1: { name: "Red", color: "#f10000" },
    player2: { name: "Yellow", color: "#ece100" },
  },
});

export const gameStatsState = atom<Stats>({
  key: "gameStats",
  default: {
    played: 0,
    player1Wins: 0,
    player2Wins: 0,
  },
});

export const PlayWithBotState = atom<boolean>({
  key: "playWithBot",
  default: false,
});
