import './App.css';
import React from 'react';
import PokeCardFront from './components/pokeCardFront'
import PokeCardBack from './components/pokeCardBack';
import PokeSideBar from './components/pokeSideBar';
import PokeTopBar from './components/pokeTopBar';
const { useEffect, useState, useContext } = React;

export const AppData = React.createContext();

function App() {

  const [curPokemon, setcurPokemon] = useState(); //Poke Data
  const [curPokemonArray, setCurPokemonArray] = useState([])
  const [showFront, setShowFront] = useState(null);
  const [pokemonList, setpokemonList] = useState([])
  const [pokemonSearch, setpokemonSearch] = useState([])
  const [page, setPage] = useState(1)

  const [apiUrl] = useState(`https://pokeapi.co/api/v2/pokemon/`); // API URL

  useEffect(() => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const pokeName = params.get("name")
    if(pokeName !== null){
      getFetchData(apiUrl + pokeName)
    }
    getPokeList()
    search("")

    async function getFetchData(url){
      let data = await fetchData(url)
      const initPokemon = await formatPokemonData(data)
      setcurPokemon(initPokemon);
      setShowFront(true);
    }

    async function getPokeList(){
      let fullPkArray = await (fetchData(`https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0`));
      setpokemonList(fullPkArray.results);
      }
    }, [])

  useEffect((() =>{
    search("")
  }), [pokemonList])
  
  useEffect(() => {
    fetchEvolutionData();
    let pokemonArray = [];
    let evolutionNames = [];
    let pokemonArrayFinal = [];

    async function fetchEvolutionData(){ 
      let speciesData = await fetchData(curPokemon.speciesURL)
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
        if(curPokemon.name === name){
          pokemonArray.push(curPokemon)
        }else {
          let data = await fetchData(apiUrl + name)
          pokemonArray.push(formatPokemonData(data))
        }
        pokemonArrayFinal = await Promise.all(pokemonArray);
        
      }
      setpokemonSearch([])
      setShowFront(true);
      setCurPokemonArray(pokemonArrayFinal);
    }

  },[curPokemon])
  
  function search(searchParameter){
    setShowFront(null)
    setPage(1)
    let pokeSearch = []
    for(let pokemon of pokemonList) {
      if(pokemon.name.includes(searchParameter)) {
        pokeSearch.push(fetchData(pokemon.url)
        .then(data => formatPokemonData(data)))
      }
    }
    Promise.all(pokeSearch)
    .then(finalPokeSearch => setpokemonSearch(finalPokeSearch))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>PokéDex</h1>
        <label htmlFor='search'>Search</label>
        <input type="text" id='search' placeholder="Who's that Pokémon!?"></input>
        <button onClick={() => search(document.getElementById('search').value)}>Submit</button>
      </header>
      <main>
        {pokemonSearch.length > 0 && <div className='navButtons'>
          <button type="button" onClick={() => page > 1 ? setPage(page-1) : () => {return}}>Previous</button>
          <button type="button" onClick={() => page + 1 < (pokemonSearch.length / 25) +1 ? setPage(page+1) : () => {return}}>Next</button>
        </div>}
        <AppData.Provider value={setcurPokemon}>
          <PokeTopBar pokeData={pokemonSearch} page={page}/>
        </AppData.Provider>
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
    stats: data.stats,
    speciesURL: data.species.url
  }
}


//isTrue? <PokeCardFront pokeData={curPokemon}/> : <PokeCardBack pokeData={curPokemon}/>