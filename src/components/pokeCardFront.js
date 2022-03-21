import "../App";

const PokeCardFront = ({pokeData}) =>{
  console.log(pokeData)
  return(
    <section className="card">
      <h3>{pokeData.name}</h3>
      <img src={pokeData.sprites.front_default}/>
      {pokeData.types.map(type => {
          return (<h4 className={type.type.name + " type"}> {type.type.name}</h4>)
        })}
    </section>
  )
}

export default PokeCardFront
