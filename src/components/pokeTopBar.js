import React, { useContext } from 'react';
import App, { AppData } from "../App";
import PokeTopBarItem from './pokeTopBarItem';

const PokeTopBar = ({pokeData, page}) => {
  const setcurPokemon = useContext(AppData)
  // return (
  //   <div className='searchGrid'>
  //   {pokeData.map((pokemon) => <PokeTopBarItem key={pokemon.name} pokeData={pokemon}/>)}
  //   </div>
  // )
let searchLimit = page * 25
let searchLowerLimit = searchLimit - 25
let searchRender = [];
for(let x = searchLowerLimit; x < pokeData.length && x < searchLimit; x++) {
 searchRender.push(<PokeTopBarItem key={pokeData[x].name} pokeData={pokeData[x]}/>)
}
return (
  <div className='searchGrid'>
    {searchRender}
  </div>
)
}

export default PokeTopBar;


