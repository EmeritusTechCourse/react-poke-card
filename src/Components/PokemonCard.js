import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

export default function PokemonCard(props) {
  const name = props.data.name[0].toUpperCase() + props.data.name.slice(1);

  const [frontFacing, setFrontFacing] = useState(true);
  const [image, setImage] = useState(props.data.sprites.front_default);

  useEffect(() => {
    frontFacing ? setImage(props.data.sprites.front_default) : setImage(props.data.sprites.back_default);
  }, [frontFacing, name])

  const handleClick = (event) => {
    setFrontFacing(!frontFacing);
  }

  return (
    <IconButton onClick={handleClick}>
      <Paper className="PokemonCard"
             elevation={7}
             style= {{height: 280, width: 200}}>
        {frontFacing && <Typography variant="h5">{name}</Typography> }
        <img src={image} style={{width:'100%', height:'auto'}} alt={`Image of ${name}`}></img>
      </Paper>
    </IconButton>
  )
}