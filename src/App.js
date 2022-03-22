import './App.css';
import React, {useState, useEffect, createContext} from 'react';
import PokeCard from './PokeCard'



export const pokemonContext = createContext(null);

function App() {
  const [pokemon, setPokemon] = useState({})
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.get('name')}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
  }, [])

  return (
    (Object.keys(pokemon)).length === 0 ? <div></div> :
    <pokemonContext.Provider value={pokemon}>
      <PokeCard />
    </pokemonContext.Provider>
  )
}
export default App;

/*
State has to be the information on the card initially set to empty
Upon start up, there needs to be a fetch up information to a pokemon (first one or random??)

Use effect needs to fetch on start up, but that same function needs to be applied when there's a change to the state
Whenever the user types a name into the search bar, that needs to change the state somehow (setState), which will
 trigger useEffect to fetch the data from the searched pokemon's name

 all needs to be on a pokemon card

 the card needs to be a button where onClick, it flips to the back of the card, meaning fetch needs to populate the back aswell...

 
*/