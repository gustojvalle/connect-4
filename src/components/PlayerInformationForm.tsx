
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, FormLabel, Heading, Input } from '@chakra-ui/react'
import React, {  useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { playersInfoState } from 'state';
import css from './styles/PlayerInformationForm.module.css';
import nameThisColor from 'name-this-color'; 

type Props ={player: string|number }


export const PlayerInformationForm = ({player}:Props) => {
    const playerString = `player${player}`


    const [playersInfo , setPlayersInfo] = useRecoilState(playersInfoState)
    const [formState , setFormState] = useState(playersInfo[playerString])
    const [colorName, setColorName] = useState('')
    const [useColorName , setUseColorName] = useState(false)


    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
        const target = e.target as HTMLTextAreaElement

        if(target.name === 'color' )  setColorName(nameThisColor(target.value)[0].title)
 
        setFormState(prev => ({...prev, [target.name]: target.value}))
    }
    const handleCheckBox = (e: React.FormEvent<HTMLInputElement>) =>{
        const target = e.target as any

        setUseColorName(target.checked)


    }

    const onConfirm =(e : React.FormEvent) => {
        e.preventDefault(); 
        setPlayersInfo((prev:any) => ({...prev, [playerString]:{...formState, name: useColorName? colorName: formState.name}}))
    } 


    useEffect(()=> {
        if(useColorName)setFormState(prev => ({...prev, name:colorName}))
    }, [colorName])


  return (
    
    <form onSubmit= {onConfirm} className={css.root}>
        <Box border={`1px solid ${formState.color}`} padding={1} borderRadius='6px' display={'flex'} alignItems='flex-start' flexDir='column' marginEnd={8}>
            <Box display='flex' >
        <FormLabel htmlFor={`player${player}Name`} className={css.labelPlayer}><Heading  as="h4" size='sm' mr={4}>Player{player} Name</Heading></FormLabel>
        
        <Input marginRight={2} marginBottom={[4, 0]}  onChange={handleChange} type="text" name={`name`} id={`player${player}Name`} placeholder={useColorName ? colorName:playersInfo[playerString].name}  />
        <Input  marginRight={2}  width={'100px'}  padding={0} onChange={handleChange} type="color" name={`color`} id={`player${player}Color`} value={formState.color}/>

        <Button type='submit'><CheckIcon color={formState.color} /></Button>
        </Box>
        <Box display='flex' alignItems='center'>
            <FormLabel size='sm'>Use color name?</FormLabel>
            <Checkbox onChange={handleCheckBox} />
        </Box>
        </Box>
    </form>

  )
}
