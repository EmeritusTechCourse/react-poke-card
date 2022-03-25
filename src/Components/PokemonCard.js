import React, { useState, useEffect, useReducer } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

theme.typography.p = {
  fontSize: '1.2rem',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'front card':
      return action.payload;
    case 'back card':
      return action.payload;
    default:
      return '';
  }
}

export default function PokemonCard(props) {
  const id = props.data.id;
  const [frontFacing, setFrontFacing] = useState(true);
  const [card, dispatch] = useReducer(reducer, {});

  const changeToFrontCard = () => {
    dispatch({
      type: 'front card',
      payload: {
        title: props.data.name[0].toUpperCase() + props.data.name.slice(1),
        image: props.data.sprites?.front_default,
        types: props.data.types.map(t => t.type.name)
      }
    })
  }

  const changeToBackCard = () => {
    dispatch({
      type: 'back card',
      payload: {
        image: props.data.sprites?.back_default,
        stats: {
          'HP': props.data.stats?.[0].base_stat,
          'Attack': props.data.stats?.[1].base_stat,
          'Defense': props.data.stats?.[2].base_stat,
          'Special Attack': props.data.stats?.[3].base_stat,
          'Special Defense': props.data.stats?.[4].base_stat,
          'Speed': props.data.stats?.[5].base_stat,
        }
      }
    })
  }

  useEffect(() => {
    frontFacing ? changeToFrontCard() : changeToBackCard();
  }, [frontFacing, id])

  useEffect(() => {
    setFrontFacing(true);
  }, [id])

  const handleClick = (event) => {
    setFrontFacing(!frontFacing);
  }

  const paperStyle = () => {
    return (
      frontFacing ?
      {height: 250,
        width: 200,
        margin: '0 auto',
        backgroundImage:`url('https://bit.ly/3qrnVvv')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        } :
      {height: 250,
        width: 200,
        margin: '0 auto',
        backgroundImage:`url('https://bit.ly/3qrnVvv')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
        }
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={handleClick}>
        <Container fixed>
        <Paper className="PokemonCard"
              elevation={7}
              style= {paperStyle()}>
          <div>
            <h4 className="nameText">{card.title}</h4>
          </div>
          <div>
            <img src={card.image} style={frontFacing ? {width:'55%', height:'auto', padding: '0px'} : {width:'auto', height:'50%'}} alt={id}></img>
          </div>
          <div>
            {frontFacing ?
                  card.types && <p>{(card.types.length === 1 ? `${card.types[0]}` : `${card.types[0]} / ${card.types[1]}`)}</p>
                            :
                  card.stats && <ul className="statsText">{Object.keys(card.stats).map((stat, i) => (
                    <li key={i}>{`${stat}: ${card.stats[stat]}`}</li>))
                  }</ul>
                }
          </div>
        </Paper>
        </Container>
      </IconButton>
    </ThemeProvider>
  )
}