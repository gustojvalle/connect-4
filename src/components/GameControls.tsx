import { Box, Button, FormLabel, Switch } from "@chakra-ui/react";
import React, { FC } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { boardState, gameOverState, playerState, PlayWithBotState } from "state";
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

  const [bot, setBot] = useRecoilState(PlayWithBotState)
  const handleSwitch = (e: React.FormEvent) =>{
   const target = e.target as  any; 
    setBot(target.checked)
  }

  return (
    <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
    <Button marginBottom={8} onClick={handleReset} isDisabled={!board.some((col) => col.length)}>
      Reset
    </Button>
    <FormLabel >Play with bot</FormLabel>
    <Switch marginBottom={8} isChecked={bot} onChange={handleSwitch} />
    <Box display={'flex'} flexDir={[ 'column', 'row']}>
      <PlayerInformationForm player={1} />
      {!bot && <PlayerInformationForm player={2} />}
    </Box>
    </Box>
  );
};

export default GameControls;
