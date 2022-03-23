import React, { useContext, useState, useEffect } from "react";
import {pokeDataContext} from "../App.js";
import '../styles/PokemonCard.css';

const PokemonCard = () => {
  const pokeInformation = useContext(pokeDataContext)
  const inputStyle = {}
  
  const currentPokemonAbilities = pokeInformation.abilities.map(typeObj => typeObj.ability.name)
  const currentPokemonMoves = [pokeInformation.moves[0].move.name, pokeInformation.moves[1].move.name]
  const currentPokemonBodyType = [{'Height': pokeInformation.height}, {'Weight': pokeInformation.weight}]
  const currentPokemonStats = [{'HP': pokeInformation.stats[0].base_stat}, {'Attack': pokeInformation.stats[1].base_stat}]

  const [displayImage, setDisplayImage] = useState(pokeInformation.sprites.front_default)
  const [displayedLeftDetails, setLeftDetails] = useState(currentPokemonAbilities)
  const [displayedRightDetails, setRightDetails] = useState(currentPokemonBodyType)
  const [displayedLeftHeader, setLeftHeader] = useState('Abilities')
  const [displayedRightHeader, setRightHeader] = useState('Body')

  
  return (
  <div className="card" onClick={() => 
    {
      setDisplayImage(displayImage === pokeInformation.sprites.front_default ? pokeInformation.sprites.front_shiny : pokeInformation.sprites.front_default)
      setLeftDetails(displayedLeftDetails.toString() === currentPokemonAbilities.toString() ? currentPokemonMoves : currentPokemonAbilities)
      setRightDetails(('Height' in displayedRightDetails[0]) ? currentPokemonStats : currentPokemonBodyType)
      setLeftHeader(displayedLeftHeader === 'Abilities' ? 'Moves' : 'Abilities')
      setRightHeader(displayedRightHeader === 'Body' ? 'Stats' : 'Body')
    }
  }>
    <div className="name">
      <h4>{displayImage === pokeInformation.sprites.front_default ? pokeInformation.name.charAt(0).toUpperCase() + pokeInformation.name.slice(1) : <b><i>{pokeInformation.name.charAt(0).toUpperCase() + pokeInformation.name.slice(1)}</i></b>}</h4>
    </div>
    <img className="sprite" src={displayImage} alt={pokeInformation.name}></img>
    <div className="container">
      <div className="details">
        {displayedLeftHeader}
          <ul>
            {displayedLeftDetails.map(leftDetail => <li key={leftDetail}>{leftDetail}</li>)}
          </ul>
      </div>
      <div className="details">
        {displayedRightHeader}
        <ul>
          {displayedRightDetails.map(rightDetail => 
          {
            for(let key in rightDetail){
              return <li key={rightDetail}>{key + ": " + rightDetail[key]}</li>
            }
          })
          }
        </ul>
      </div>
    </div>
  </div>
  )
}

export default PokemonCard;