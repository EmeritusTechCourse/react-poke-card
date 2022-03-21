import './App.css';
import React, {useState, useEffect} from 'react';
import PokeCard from './PokeCard'


function App() {
  
  const [pokemon, setPokemon] = useState({pokeData:[]})
 //i want the used state to be an empty array 
 //then on start up, fetch the data and make its 'results' array the new pokeData array
 //then iterate through it to find the pokemon that someone searches for
 //then fetch the data of the searched pokemon


 useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=0`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data.name);
        setPokemon({pokeData:data.results});
      })
  }, [])
  
  console.log(pokemon.pokeData.results)

  //create a function that iterates throught the pokemon.pokeData array
  // if pokemon.pokeData[i].name === to the name searched, fetch pokemon.pokeData[i].url

  return (
    <div className='App'>
     
    </div>
  );
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