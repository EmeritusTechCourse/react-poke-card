const PokeCardBack = ({pokeData}) => {
  return (
    <>
      <h3>{pokeData.name}</h3>
      <img src={pokeData.sprites.front_default}/>
      <img src={pokeData.sprites.back_default}/>
      <div className="statsHolder">
        <ul>
          {pokeData.stats.map(stat => {
            return (<li key={stat.stat.name}>{stat.stat.name + ": " + stat.base_stat}</li>)
          })}
        </ul>
      </div>
      {pokeData.types.map(type => {
          return (<h4 key={type.type.name} className={type.type.name + " type"}> {type.type.name}</h4>)
        })}
    </>
  )
}

export default PokeCardBack;
