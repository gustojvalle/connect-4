import { boardRows } from "const";
import { useRecoilState } from "recoil";
import { boardState, gameOverState, gameStatsState, playerState } from "state";
import { DiagonalCheck, Increment, Stack } from "types";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const checkDiagonal: DiagonalCheck = (
  row,
  col,
  player,
  board,
  stack,
  direction,
  increment
): any => {
  const { stackOne, stackTwo } = stack;

  // Using a depth first search to each diagonal from the point outside considering that the
  //starting point is already filled in the new board will make the maximum stack length for a win to be 3

  if (stackOne.length === 3 || stackTwo.length === 3) return true;

  if (
    board[col] === undefined ||
    board[col][row] === undefined ||
    col < 0 ||
    col > board.length ||
    row < 0 ||
    board[col].length === 0 ||
    board[col][row] !== player
  )
    return false;
  const checkDirection = direction.includes("1");

  const currStack: string = checkDirection ? "stackOne" : "stackTwo";

  stack[currStack] = [...stack[currStack], player];

  return checkDiagonal(
    row + increment[direction][0],
    col + increment[direction][1],
    player,
    board,
    stack,
    direction,
    increment
  );
};

const testDiagonals = (
  currRow: number,
  currCol: number,
  player: number,
  board: Array<Array<number>>
) => {
  // increment = {diagonal<number><Direction>: [col increment, row increment]}
  const increment: Increment = {
    diagonal1Up: [1, 1],
    diagonal1Down: [-1, -1],
    diagonal2Up: [-1, 1],
    diagonal2Down: [1, -1],
  };
  let stack: Stack = {
    stackOne: [],
    stackTwo: [],
  };

  return (
    checkDiagonal(
      currRow + increment["diagonal1Up"][0],
      currCol + increment["diagonal1Up"][1],
      player,
      board,
      stack,
      "diagonal1Up",
      increment
    ) ||
    checkDiagonal(
      currRow + increment["diagonal1Down"][0],
      currCol + increment["diagonal1Down"][1],
      player,
      board,
      stack,
      "diagonal1Down",
      increment
    ) ||
    checkDiagonal(
      currRow + increment["diagonal2Up"][0],
      currCol + increment["diagonal2Up"][1],
      player,
      board,
      stack,
      "diagonal2Up",
      increment
    ) ||
    checkDiagonal(
      currRow + increment["diagonal2Down"][0],
      currCol + increment["diagonal2Down"][1],
      player,
      board,
      stack,
      "diagonal2Down",
      increment
    )
  );
};

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const [_, setGameStats] = useRecoilState(gameStatsState);
  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;
    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      // TODO: Did win diagonally
      testDiagonals(row, col, player, newBoard)
    ) {
      const playerWinsString = `player${player}Wins`;
      setGameOver(true);
      setGameStats((prev: any) => ({
        ...prev,
        played: prev.played + 1,
        [playerWinsString]: prev[playerWinsString] + 1,
      }));
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
