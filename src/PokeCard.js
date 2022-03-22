import React, { useContext } from 'react';
import "./App";
import { pokemonContext } from './App.js'


const PokeCard = () => {
  const pokeInformation = useContext(pokemonContext)
  const inputStyle = {}
    
    
  return (
   <article className = 'card'>
    <h3>{pokeInformation.name}</h3>
    <img src={pokeInformation.sprites.front_default}></img>
    <div className="pokeData">
        {pokeInformation.types.map(type => {
          return (<h4 className={type.type.name + " type"}> {type.type.name}</h4>)
        })}
      </div>
   </article> 
  )  
    
    
}

export default PokeCard