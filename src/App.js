import './App.css';
import React from 'react';
import PokeCardFront from './components/pokeCardFront'
import PokeCardBack from './components/pokeCardBack';
import PokeSideBar from './components/pokeSideBar';
const { useEffect, useState, useContext } = React;

export const AppData = React.createContext();

function App() {

  const [curPokemon, setcurPokemon] = useState(); //Poke Data
  const [curPokemonArray, setCurPokemonArray] = useState([])
  const [showFront, setShowFront] = useState(null);
  // const [searchUrl, setSearchUrl] = useState("1")
  const [apiUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`); // API URL

  useEffect(() => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const pokeName = params.get("name")
    getFetchData(apiUrl + pokeName)

    async function getFetchData(url){
      let pokemonArray = [];
      let evolutionNames = []
      let data = await fetchData(url)
      const initPokemon = await formatPokemonData(data)

      let speciesData = await fetchData(data.species.url)
      let evolutionData = await fetchData(speciesData.evolution_chain.url);
      evolutionNames.push(evolutionData.chain.species.name)
      
      recurseEvolution(evolutionData.chain.evolves_to)
      //recursively grab pokemon data
      async function recurseEvolution(evolves_to){
        for(let names of evolves_to){
          evolutionNames.push(names.species.name);
          recurseEvolution(names.evolves_to)
        }
        if(evolutionData.chain.evolves_to.length === 0){
          return null;
        }
      }

      for(let name of evolutionNames){
        if(initPokemon.name === name){
          pokemonArray.push(initPokemon)
        }else {
          let data = await fetchData(apiUrl + name)
          pokemonArray.push(formatPokemonData(data))
        }
        let pokemonArrayFinal = await Promise.all(pokemonArray)
        
        console.log(pokemonArrayFinal)

        setcurPokemon(initPokemon);
        setCurPokemonArray(pokemonArrayFinal);
        setShowFront(true);
      }
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokéDex</h1>
      </header>
      <main>
        {showFront !== null && <aside>
          <AppData.Provider value={setcurPokemon}>
            <PokeSideBar pokeData={curPokemonArray}/>
          </AppData.Provider>
        </aside>}
        <div className='cardContainer'>
          {showFront &&  <section className='card' onClick={() => setShowFront(false)}>
          <PokeCardFront pokeData={curPokemon}/>
          </section>}
          {showFront === false && <section className="card" onClick={() => setShowFront(true)}>
          <PokeCardBack pokeData={curPokemon}/>
          </section>}
        </div>
      </main>
    </div>
  );
}

export default App;

async function fetchData(url){
  const res = await fetch(url);
  let data = await res.json();
  return data;
}

async function formatPokemonData(data){
  return{
    name: data.name,
        sprites: data.sprites,
        types: data.types,
        stats: data.stats
  }
}


//isTrue? <PokeCardFront pokeData={curPokemon}/> : <PokeCardBack pokeData={curPokemon}/>