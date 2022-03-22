import './App.css';
import React, {useState, useEffect, createContext} from 'react';
import PokeCard from './PokeCard'

export const pokemonContext = createContext(null);

function App() {
  const [pokemon, setPokemon] = useState({})
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  let familyNames = []

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.get('name')}`)
      .then(response => response.json())
      .then(data => setPokemon(data)) 
      }, [])
      
      // useEffect(() => {
      //   fetch(`https://pokeapi.co/api/v2/pokemon/${params.get('name')}`)
      //     .then(response => response.json())
      //     .then(data => fetch(data.species.url))
      //     .then(species => species.json())
      //     .then(speciesData => fetch(speciesData.evolution_chain.url))
      //     .then(evolutionChain => evolutionChain.json())
      //     .then(evolutionData => { 
      //       familyNames.push(evolutionData.chain.species.name)
    
      //       function recEvo(evolutionData){
      //         if(evolutionData.chain.evolves_to.length === 0){
      //           return null
      //         }
      //         evolutionData.chain.evolves_to.forEach(name => familyNames.push(name.species.name))
      //           recEvo(names.evolves_to)
      //         }
      //       }
      //     })
      //     console.log(familyNames)
      //   }, [])
    
    

  //   fetch(`https://pokeapi.co/api/v2/pokemon/${params.get('name')}`)
  //   .then(response => response.json())
  //   .then(data => data.) 

  // }, [])

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