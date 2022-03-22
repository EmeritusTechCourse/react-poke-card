import React, { useContext } from 'react';
import App, { AppData } from "../App";

const PokeTopBarItem = ({pokeData}) => {
  const setcurPokemon = useContext(AppData)
  return (
    <div className='pokemonItem'>
      <h6 key={pokeData.name}>{pokeData.name}</h6>
      <img src={pokeData.sprites.front_default} onClick={() => setcurPokemon(pokeData)}/>
    </div>
  )
}

export default PokeTopBarItem;