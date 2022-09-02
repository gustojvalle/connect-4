import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerState } from "state";
import { PlayerInformationForm } from "./PlayerInformationForm";




const GameControls: FC = ( ) => {
  const board = useRecoilValue(boardState);
  const resetBoard = useResetRecoilState(boardState);
  const resetPlayer = useResetRecoilState(playerState);
  const resetGameOver = useResetRecoilState(gameOverState);


  const handleReset = () => {
    resetBoard();
    resetPlayer();
    resetGameOver();
  };

  return (
    <div>
    <Button onClick={handleReset} isDisabled={!board.some((col) => col.length)}>
      Reset
    </Button>
    <PlayerInformationForm player={1} />
    <PlayerInformationForm player={2} />
    </div>
  );
};

export default GameControls;
