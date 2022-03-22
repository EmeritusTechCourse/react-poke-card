import React, { useContext, useState, useEffect } from "react";
import {pokeDataContext} from "../App.js";
import '../styles/PokemonCard.css';

const PokemonCard = () => {
  const pokeInformation = useContext(pokeDataContext)
  const inputStyle = {}
  let currentPokemonAbilities = [];
  let currentPokemonMoves = [];

  const [displayImage, setDisplayImage] = useState(pokeInformation.sprites.front_default)
  const [displayedDetails, setDisplayedDetails] = useState(currentPokemonAbilities)

  useEffect(() => {
      currentPokemonAbilities = pokeInformation.abilities.map(typeObj => typeObj.ability.name)
      currentPokemonMoves = [pokeInformation.moves[0].move.name, pokeInformation.moves[1].move.name]
    }, [])

  
  return (
  <div className="card" onClick={() => 
    {
      setDisplayImage(displayImage === pokeInformation.sprites.front_default ? pokeInformation.sprites.front_shiny : pokeInformation.sprites.front_default)
      setDisplayedDetails(displayedDetails === currentPokemonAbilities ? currentPokemonMoves : currentPokemonAbilities)
    }
  }>
    <div className="name">
      <h4><b>{pokeInformation.name.charAt(0).toUpperCase() + pokeInformation.name.slice(1)}</b></h4>
    </div>
    <img className="sprite" src={displayImage} alt={pokeInformation.name}></img>
    <div className="container">
      <div>Abilities:</div>
      <ul>
        {displayedDetails.map(detail => <li key={detail}>{detail}</li>)}
      </ul> 
    </div>
  </div>
  )
}

export default PokemonCard;