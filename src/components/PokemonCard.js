import React, { useContext } from "react";
import {pokeDataContext} from "../App.js"
import '../styles/PokemonCard.css'

const PokemonCard = () => {
  const pokeInformation = useContext(pokeDataContext)
  const inputStyle = {}

  // if (pokeInformation.types[0].type.name === 'grass') {
    

  // }



  
  

  // if (value == "411") 
  // $(".jp-front").css({backgroundImage:"url(http://www.lowestrates.ca/newcontent/img/creditcards/Gold_Rewards_Card_chip_467x293.png)"});

  return(
  <div className="card">
      <img className="sprite" src={pokeInformation.sprites.front_default} alt={pokeInformation.name}></img>
    <div className="container">
      <h4><b>{pokeInformation.name}</b></h4>
      <div>Types:</div>
      <ul>
        {pokeInformation.types.length === 1 ? <li>{pokeInformation.types[0].type.name}</li>  : pokeInformation.types.map(typeObj => <li>{typeObj.type.name}</li>)}
      </ul> 
    </div>
  </div>
  )
}

export default PokemonCard;