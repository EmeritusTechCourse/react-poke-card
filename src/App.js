import PokemonCard from './Components/PokemonCard.js'
import SearchAppBar from './Components/SearchAppBar.js'
import React, { useState, useEffect } from 'react'
import './App.css';
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'


function App (){
  const limit = 15;
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${nameParam}`)
      .then(response => response.json())
      .then(data => setPokemon([data]));
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit*(page-1)}`)
      .then(res => res.json())
      .then(data => {
        const urls = data.results.map(x => x.url);
        const pokemonData = urls.map(url => {
          return fetch(url)
            .then(res => res.json());
        })
        Promise.all(pokemonData)
          .then(results => setPokemon(results))
      });
    }
  }, [page])

  const handlePaging = (event, page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <SearchAppBar />
      <Grid container
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '50vh' }}
            gap={1}> {
              pokemon.map( (pokemon, i) => (
                <Grid item xs={6} sm={6} md={3} lg={2} xl={1.5} key={i}>
                  <PokemonCard id={i+limit*(page-1)+1} data={pokemon} />
                </Grid>
              ))
            }
      </Grid>
      <div className="Pagination">
        <Pagination count={Math.ceil(1126 / limit)}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    siblingCount={3}
                    boundaryCount={1}
                    onChange={handlePaging}
        />
      </div>
    </div>
  );
}

export default App;
