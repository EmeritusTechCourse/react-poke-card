import './App.css';
import React from 'react';
import PokeCardFront from './components/pokeCardFront'
import PokeCardBack from './components/pokeCardBack';
const { useEffect, useState } = React;


function App() {
  
  const [curPokemon, setcurPokemon] = useState({}) //Poke Data
  const [searchUrl, setSearchUrl] = useState("1")
  const [apiUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`); // API URL
  
  useEffect(() => {
    async function getFetchData(url){
      const res = await fetch(url)
      let data = await res.json()
      setcurPokemon({
          name: data.name,
          sprites: data.sprites,
          types: data.types,
          stats: data.stats,
          showFront: true
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
        {curPokemon.showFront !== null && <aside>
          
        </aside>}
        {curPokemon.showFront &&  <section className='card' onClick={() => setcurPokemon({...curPokemon, showFront: false})}>
        <PokeCardFront pokeData={curPokemon}/>
        </section>}
        
        {curPokemon.showFront === false && <section className="card" onClick={() => setcurPokemon({...curPokemon, showFront: true})}>
        <PokeCardBack pokeData={curPokemon}/>
        </section>}
      </main>
    </div>
  );
}

export default App;

//isTrue? <PokeCardFront pokeData={curPokemon}/> : <PokeCardBack pokeData={curPokemon}/>