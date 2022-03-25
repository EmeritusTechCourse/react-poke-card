import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard.js';

// const windowUrl = window.location.search;
// if ("?name=" not in windowUrl) {
//   throw new Error("Use required format")
// } else {
// const params = new URLSearchParams(windowUrl);
// }
// const params = new URLSearchParams(windowUrl);
export const pokeDataContext = createContext(null)

function App() {
  const [pokeData, setPokeData] = useState({});
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.get('name')}`)
    .then(response => response.json())
    .then(data => setPokeData(data))
  }, [])

  return (
    (Object.keys(pokeData)).length === 0 ? <div></div> :
    <pokeDataContext.Provider value={pokeData}>
      <PokemonCard />
    </pokeDataContext.Provider>
  )
}

export default App;
