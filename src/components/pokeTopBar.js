import React, { useContext } from 'react';
import App, { AppData } from "../App";
import PokeTopBarItem from './pokeTopBarItem';

const PokeTopBar = ({pokeData}) => {
  const setcurPokemon = useContext(AppData)
  return (
    <div className='searchGrid'>
    {pokeData.map((pokemon) => <PokeTopBarItem key={pokemon.name} pokeData={pokemon}/>)}
    </div>
  )
}

export default PokeTopBar;