import React, { useState, useEffect, useReducer } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

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
  const name = props.data.name[0].toUpperCase() + props.data.name.slice(1);

  const [frontFacing, setFrontFacing] = useState(true);
  // const [image, setImage] = useState(props.data.sprites.front_default);
  const [card, dispatch] = useReducer(reducer, props.data.sprites.front_default);

  const changeToFrontCard = () => {
    dispatch({
      type: 'front card',
      payload: {
        image: props.data.sprites.front_default
      }
    })
  }

  const changeToBackCard = () => {
    dispatch({
      type: 'back card',
      payload: {
        image: props.data.sprites.back_default
      }
    })
  }

  useEffect(() => {
    frontFacing ? changeToFrontCard() : changeToBackCard();
  }, [frontFacing, name])

  const handleClick = (event) => {
    setFrontFacing(!frontFacing);
  }

  return (
    <IconButton onClick={handleClick}>
      <Paper className="PokemonCard"
             elevation={7}
             style= {{height: 250, width: 200}}>
        {frontFacing ? <Typography variant="h5">{name}</Typography> : <Typography variant="h6">Stats</Typography>}
        <img src={card.image} style={{width:'100%', height:'auto'}} alt={name}></img>
      </Paper>
    </IconButton>
  )
}