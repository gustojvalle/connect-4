import { Box, CircularProgress, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, gameStatsState, playersInfoState, playerState, PlayWithBotState } from "state";
import css from './styles/PlayerInformationForm.module.css'


type Props = {}

const GameProgress: FC<Props> = ({}:Props) => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playersInfoo = useRecoilValue(playersInfoState)
  const gameStats = useRecoilValue(gameStatsState)
  const {name, color} = playersInfoo[`player${player}`];
  const playWithBot = useRecoilValue(PlayWithBotState)




  return (
    <Box  className={css.rootProgress}>
   {!gameOver &&  <Box  display={'flex'} alignItems='center'>
      {playWithBot && player === 2 && !gameOver &&  <CircularProgress marginRight={1} size='18px' isIndeterminate/>}
    <Heading as="h3" size={'md'}>{player ===2 && playWithBot ? "Waiting for bot to play": "Please make your move"}</Heading>
    </Box>}
    <Heading marginBottom={8}  as="h3" size="lg">
      {gameOver ?<><span style={{color: color}}>{name}</span> wins!</>:  <><span style={{color: color}}>{name}</span>'s turn</>}
    </Heading>
        <Heading as="h4" size='md'> Games Played :{gameStats.played} </Heading> {Object.keys(playersInfoo).map(player => <Heading key={player} as="h4" size='md'>Player  <span style={{color:playersInfoo[player].color}} >{playersInfoo[player].name}</span> wins: <span >{gameStats[`${player}Wins`]}</span></Heading>)} 

    </Box>
  );
};

export default GameProgress;
