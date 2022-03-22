import React, { useState, useEffect, useReducer } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

theme.typography.p = {
  fontSize: '1rem',
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
          hp: props.data.stats?.[0].base_stat,
          attack: props.data.stats?.[1].base_stat,
          defense: props.data.stats?.[2].base_stat,
          specialAttack: props.data.stats?.[3].base_stat,
          specialDefense: props.data.stats?.[4].base_stat,
          speed: props.data.stats?.[5].base_stat,
        }
      }
    })
  }

  useEffect(() => {
    frontFacing ? changeToFrontCard() : changeToBackCard();
  }, [frontFacing, id])

  const handleClick = (event) => {
    setFrontFacing(!frontFacing);
  }

  return (
    <ThemeProvider theme={theme}>
      <IconButton onClick={handleClick}>
        <Container fixed>
        <Paper className="PokemonCard"
              elevation={7}
              style= {{height: 250, width: 200}}>
          <div>
            <Typography variant="h5">{card.title}</Typography>
          </div>
          <div>
            <img src={card.image} style={frontFacing ? {width:'80%', height:'auto'} : {width:'auto', height:'50%'}} alt={id}></img>
          </div>
          <div>
            {frontFacing ?
                  <Typography variant="p">{card.types && (card.types.length === 1 ? `${card.types[0]}` : `${card.types[0]} / ${card.types[1]}`)}</Typography> :
                  <Typography variant="p">{card.stats && Object.keys(card.stats).map((stat, i) => (
                    `${stat}: ${card.stats[stat]}\n`
                    ))}</Typography>}
          </div>
        </Paper>
        </Container>
      </IconButton>
    </ThemeProvider>
  )
}