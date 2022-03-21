const PokeCardFront = ({pokeData}) =>{
  // console.log(pokeData)
  return(
    <>
      <h3>{pokeData.name}</h3>
      <img src={pokeData.sprites.front_default}/><br/>
      {pokeData.types.map(type => {
          return (<h4 key={type.type.name} className={type.type.name + " type"}> {type.type.name}</h4>)
        })}
    </>
  )
}

export default PokeCardFront
