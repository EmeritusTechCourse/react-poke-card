import React, { useContext } from 'react';
import App, { AppData } from "../App";

const PokeSideBar = ({pokeData}) => {
  const setcurPokemon = useContext(AppData)
  return (
    <>
      {
        pokeData.map((pokemon) => {
          return (
            <div key={pokemon.name}>
              <h4 key={pokemon.name}>{pokemon.name}</h4>
              <img src={pokemon.sprites.front_default} onClick={() => setcurPokemon(pokemon)}/>
            </div>
          )
        })
      }
    </>
  )
}

export default PokeSideBar;