import { Circle, Flex } from "@chakra-ui/react";
import { boardRows, playerColor } from "const";
import { usePlayPiece } from "hooks";
import { FC, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { boardState, gameOverState, playersInfoState, playerState, PlayWithBotState } from "state";
import { Player } from "types";

const padCol = (col: number[]): number[] =>
  col.join("").padEnd(boardRows, "0").split("").map(Number);

const Board: FC = () => {
  const play = usePlayPiece();
  const board = useRecoilValue(boardState);
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playersInfo = useRecoilValue(playersInfoState);
  const playWithBot = useRecoilValue(PlayWithBotState);

  useEffect(()=> {
    if(player ===2 && playWithBot){
      const nextMove = Math.floor(Math.random()*board.length)
      setTimeout(() => play(nextMove), 1000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player])


  return (
    <Flex justify="center">
      {board.map((col, i) => (
        <Flex
          key={i}
          role="group"
          onClick={() => (player === 1 || !playWithBot )&& play(i)}
          flexDirection="column-reverse"
          cursor={gameOver ? "auto" : "pointer"}
        >
          {padCol(col).map((p, j) => {
            
            return (
            <Circle
              m={1}
              size="40px"
              key={`${i}-${j}`}
              boxShadow="inner"
              bg={playersInfo[`player${p as Player}`]?.color || "gray.300"}
            />
          )})}
          <Circle
            m={1}
            size="40px"
            boxShadow="base"
            visibility="hidden"
            bg={playersInfo[`player${player}`]?.color}
            _groupHover={{
              visibility: gameOver || (playWithBot && player===2) ? "hidden" : "visible",
            }}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default Board;
