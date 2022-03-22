import React, { useContext } from 'react';
import "./App";
import { pokemonContext } from './App.js'


const PokeCard = () => {
  const pokeInformation = useContext(pokemonContext)
  const inputStyle = {}
    
    
  return (
      <div class="flip-card">
        <div class="flip-card-inner">
          <div className = 'card'>
            <h3>#{pokeInformation.id} {pokeInformation.name}</h3>
            <img src={pokeInformation.sprites.front_default}></img>
            <div className="pokeData">
              {pokeInformation.types.map(type => {
              return (<h4 className={type.type.name + " type"}> {type.type.name}</h4>)
              })}
            </div>
          </div> 
          <div class="flip-card-back">
            <img src={pokeInformation.sprites.front_shiny}></img>
            <img src={pokeInformation.sprites.back_shiny}></img>
            <table>
              <thead>
                <tr>
                  {pokeInformation.stats.map(stat => {
                  return (<th className="statHeader"> {stat.stat.name }</th>)
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {pokeInformation.stats.map(stat => {
                  return (<td className="statValue"> {stat.base_stat }</td>)
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>  
      </div>
  )}


export default PokeCard

/* 
how to get evolutionary stages

fetch pokpokeInformation.species.url
data => json()

prevEvolv = data.json().evolves_from_species.name

fetch data.json().evolution_chain
data => data.json()




*/