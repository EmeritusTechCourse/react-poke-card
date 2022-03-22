import React, {useState, useEffect} from 'react';
import SummaryCard from './components/SummaryCard';
import DetailCard from './components/DetailCard';
import EvoChain from './components/EvoChain'
import NavBar from './components/NavBar'
import logo from './logo.svg';
import './css/App.css';


// if (!params.has('pkmn')) {
//   console.error('You must select a Pokemon!');
// }

export const BASE_URL = 'https://pokeapi.co/api/v2/';

export const TYPE_ICONS = {
  normal: '/img/type_icons/NormalIC.gif',
  fighting: '/img/type_icons/FightingIC.gif',
  flying: '/img/type_icons/FlyingIC.gif',
  poison: '/img/type_icons/PoisonIC.gif',
  ground: '/img/type_icons/GroundIC.gif',
  rock: '/img/type_icons/RockIC.gif',
  bug: '/img/type_icons/BugIC.gif',
  ghost: '/img/type_icons/GhostIC.gif',
  steel: '/img/type_icons/SteelIC.gif',
  fire: '/img/type_icons/FireIC.gif',
  water: '/img/type_icons/WaterIC.gif',
  grass: '/img/type_icons/GrassIC.gif',
  electric: '/img/type_icons/ElectricIC.gif',
  psychic: '/img/type_icons/PsychicIC.gif',
  ice: '/img/type_icons/IceIC.gif',
  dragon: '/img/type_icons/DragonIC.gif',
  dark: '/img/type_icons/DarkIC.gif',
  fairy: '/img/type_icons/FairyIC.gif',
  unknown: '/img/type_icons/UnknownIC.gif',
  shadow: ''
}

export const ROUND_TYPE_ICONS = {
  normal: '/img/round_type_icons/Normal_icon_SwSh.png',
  fighting: '/img/round_type_icons/Fighting_icon_SwSh.png',
  flying: '/img/round_type_icons/Flying_icon_SwSh.png',
  poison: '/img/round_type_icons/Poison_icon_SwSh.png',
  ground: '/img/round_type_icons/Ground_icon_SwSh.png',
  rock: '/img/round_type_icons/Rock_icon_SwSh.png',
  bug: '/img/round_type_icons/Bug_icon_SwSh.png',
  ghost: '/img/round_type_icons/Ghost_icon_SwSh.png',
  steel: '/img/round_type_icons/Steel_icon_SwSh.png',
  fire: '/img/round_type_icons/Fire_icon_SwSh.png',
  water: '/img/round_type_icons/Water_icon_SwSh.png',
  grass: '/img/round_type_icons/Grass_icon_SwSh.png',
  electric: '/img/round_type_icons/Electric_icon_SwSh.png',
  psychic: '/img/round_type_icons/Psychic_icon_SwSh.png',
  ice: '/img/round_type_icons/Ice_icon_SwSh.png',
  dragon: '/img/round_type_icons/Dragon_icon_SwSh.png',
  dark: '/img/round_type_icons/Dark_icon_SwSh.png',
  fairy: '/img/round_type_icons/Fairy_icon_SwSh.png',
  unknown: '',
  shadow: ''
}

export const fetchJSON = url => fetch(url).then(r => r.json());

export default function App() {
  const [query, setQuery] = useState();
  const [pkmnList, setPkmnList] = useState();
  const [pkmnData, setPkmnData] = useState();
  const [speciesData, setSpeciesData] = useState();
  const [evoChain, setEvoChain] = useState();
  const [evoData1, setEvoData1] = useState();
  const [evoData2, setEvoData2] = useState([]);
  const [evoData3, setEvoData3] = useState([]);
  const [pkmn, setPkmn] = useState(() =>
    new URLSearchParams(window.location.search).get('pkmn')
  );
  const [showDetails, setShowDetails] = useState(false);

  async function getSprite(url) {

    const sprite = await fetchJSON(url)

    .then(data => {
      return fetchJSON(data.varieties[0].pokemon.url)
      .then(pdata => {
        return pdata.sprites.front_default
      })
    })
    .catch(err => console.log(err))
    return sprite
  }

  useEffect(() => {
    fetchJSON(`${BASE_URL}pokemon?limit=898`)
      .then(pList => {
        setPkmnList(pList.results);
        // console.log(pList);
      });
    // console.log(pkmn);

    fetchJSON(`${BASE_URL}pokemon/${pkmn}`)
    .then(pData => {
      setPkmnData(pData);
      fetchJSON(pData.species.url)
        .then(sData => {
          setSpeciesData(sData);
          fetchJSON(sData.evolution_chain.url)
            .then(eData => {
              setEvoChain(eData);
              Promise.resolve(getSprite(eData.chain.species.url))
              .then(sprite => {
                setEvoData1([{name: eData.chain.species.name.toUpperCase(), url: eData.chain.species.url, sprite: sprite}])
              }).then(() => {
                let level2 = []
                let level3 = []
                for (let pkmn of eData.chain.evolves_to) {
                  Promise.resolve(getSprite(pkmn.species.url))
                  .then(sprite => {
                    level2.push({name: pkmn.species.name.toUpperCase(), url: pkmn.species.url, sprite: sprite})
                  })
                  for (let pkmnlvl3 of pkmn.evolves_to) {
                    Promise.resolve(getSprite(pkmnlvl3.species.url))
                    .then(sprite => {
                      level3.push({name: pkmnlvl3.species.name.toUpperCase(), url: pkmnlvl3.species.url, sprite: sprite})
                    })
                  }
                }
                setTimeout(() => setEvoData2(level2), 300)
                setTimeout(() => setEvoData3(level3), 300)
              })

            })
        });
      });
    },
    []
  );

  return (
    <div className="App">
      <header>
        <h1>PokéDex</h1>
      </header>
      <main>
        <EvoChain
          pkmnData={pkmnData}
          speciesData={speciesData}
          evoData={[evoData1, evoData2, evoData3]}
        />
        {!showDetails ? <SummaryCard
                          onclick={() => setShowDetails(true)}
                          pkmnData={pkmnData}
                          speciesData={speciesData}
                        />
                      : <DetailCard
                          onclick={() => setShowDetails(false)}
                          pkmnData={pkmnData}
                          speciesData={speciesData}
                        />}
      </main>
      <NavBar pkmnList={pkmnList} />
      <footer>
        <span>
            Powered by{' '}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          <img src={logo} className="App-logo" alt="logo" />
          </a>
        </span>
      </footer>
    </div>
  );
};
