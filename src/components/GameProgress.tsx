import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, gameStatsState, playersInfoState, playerState } from "state";
import css from './styles/PlayerInformationForm.module.css'


type Props = {}

const GameProgress: FC<Props> = ({}:Props) => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playersInfoo = useRecoilValue(playersInfoState)
  const gameStats = useRecoilValue(gameStatsState)
  const {name, color} = playersInfoo[`player${player}`];




  return (
    <Box m={[2, 3]} className={css.rootProgress}>
    <Heading  as="h3" size="lg">
      {gameOver ?<><span style={{color: color}}>{name}</span> wins!</>:  <><span style={{color: color}}>{name}</span>'s turn</>}
    </Heading>

        <Heading as="h4" size='md'> Games Played :{gameStats.played} </Heading> {Object.keys(playersInfoo).map(player => <Heading key={player} as="h4" size='md'>Player  <span style={{color:playersInfoo[player].color}} >{playersInfoo[player].name}</span> wins: <span >{gameStats[`${player}Wins`]}</span></Heading>)} 

    </Box>
  );
};

export default GameProgress;
