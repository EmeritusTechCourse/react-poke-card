import "./App";

const PokeCard = ({pokeData}) => {
    <article className = 'card'>   
      <h3>{pokeData.name}</h3>
      <img src={pokeData.sprites.front_default}></img>
      <div className="pokeData">
        {pokeData.types.map(type => {
          return (<h4 className={type.type.name + " type"}> {type.type.name}</h4>)
        })}
      </div>
    </article>
}

export default PokeCard