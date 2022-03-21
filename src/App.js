import './App.css';
import React from 'react';
import PokeCardFront from './components/pokeCardFront'
const { useEffect, useState } = React;


function App() {
  
  const [curPokemon, setcurPokemon] = useState({exists: false}) //Poke Data
  const [searchUrl, setSearchUrl] = useState("1")
  const [apiUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`); // API URL
  
  useEffect(() => {
    
    async function getFetchData(url){
      const res = await fetch(url)
      let data = await res.json()
      setcurPokemon({
          exists: true,
          name: data.name,
          sprites: data.sprites,
          types: data.types
        })
    }
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const pokeName = params.get("name") 
    console.log(apiUrl + pokeName);
    getFetchData(apiUrl + pokeName)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokéDex</h1>
      </header>
      <main>
        {curPokemon.exists && <PokeCardFront pokeData={curPokemon}/>}
      </main>
    </div>
  );
}

export default App;
