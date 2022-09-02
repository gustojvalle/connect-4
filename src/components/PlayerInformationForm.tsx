
import { Box, Button, Input } from '@chakra-ui/react'
import React, {  useState } from 'react'
import { useRecoilState } from 'recoil';
import { playersInfoState } from 'state';
import css from './styles/PlayerInformationForm.module.css';

type Props ={player: string|number }


export const PlayerInformationForm = ({player}:Props) => {
    const playerString = `player${player}`


    const [playersInfo , setPlayersInfo] = useRecoilState(playersInfoState)
    const [formState , setFormState] = useState(playersInfo[playerString])


    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
        const target = e.target as HTMLTextAreaElement

        setFormState(prev => ({...prev, [target.name]: target.value}))


    }

    const onConfirm =(e : React.FormEvent) => {
        e.preventDefault(); 
        setPlayersInfo((prev:any) => ({...prev, [playerString]:formState}))
    } 


  return (
    
    <form onSubmit= {onConfirm} className={css.root}>
        <Box display={'flex'} marginEnd={8}>
        <label>Player {player} Name</label>

        <Input  onChange={handleChange} type="text" name={`name`} id={`player${player}Name`} placeholder={playersInfo[playerString].name}  />
        <Input width={30} padding={0} onChange={handleChange} type="color" name={`color`} id={`player${player}Color`} value={formState.color}/>

        <Button type='submit'></Button>
        </Box>
    </form>

  )
}
