import React, {useState,useEffect} from 'react';
import SummaryCard from './components/SummaryCard';
import DetailCard from './components/DetailCard';
import logo from './logo.svg';
import './css/App.css';


// if (!params.has('pkmn')) {
//   console.error('You must select a Pokemon!');
// }

const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchJSON = url => fetch(url).then(r => r.json());

export const TYPE_ICONS = {
  normal: 'https://archives.bulbagarden.net/media/upload/e/e4/NormalIC.gif',
  fighting: 'https://archives.bulbagarden.net/media/upload/8/8e/FightingIC.gif',
  flying: 'https://archives.bulbagarden.net/media/upload/7/73/FlyingIC.gif',
  poison: 'https://archives.bulbagarden.net/media/upload/7/71/PoisonIC.gif',
  ground: 'https://archives.bulbagarden.net/media/upload/d/d9/GroundIC.gif',
  rock: 'https://archives.bulbagarden.net/media/upload/1/15/RockIC.gif',
  bug: 'https://archives.bulbagarden.net/media/upload/2/2a/BugIC.gif',
  ghost: 'https://archives.bulbagarden.net/media/upload/4/48/GhostIC.gif',
  steel: 'https://archives.bulbagarden.net/media/upload/6/69/SteelIC.gif',
  fire: 'https://archives.bulbagarden.net/media/upload/d/d0/FireIC.gif',
  water: 'https://archives.bulbagarden.net/media/upload/c/cc/WaterIC.gif',
  grass: 'https://archives.bulbagarden.net/media/upload/8/8a/GrassIC.gif',
  electric: 'https://archives.bulbagarden.net/media/upload/f/f7/ElectricIC.gif',
  psychic: 'https://archives.bulbagarden.net/media/upload/2/23/PsychicIC.gif',
  ice: 'https://archives.bulbagarden.net/media/upload/7/70/IceIC.gif',
  dragon: 'https://archives.bulbagarden.net/media/upload/5/57/DragonIC.gif',
  dark: 'https://archives.bulbagarden.net/media/upload/e/e9/DarkIC.gif',
  fairy: 'https://archives.bulbagarden.net/media/upload/6/61/FairyIC.gif',
  unknown: 'https://archives.bulbagarden.net/media/upload/f/ff/UnknownIC.gif',
  shadow: ''
}

export default function App() {
  const [query, setQuery] = useState();
  const [data, setData] = useState();
  const [pkmn, setPkmn] = useState(() =>
    new URLSearchParams(window.location.search).get('pkmn')
  );
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
      // var params = new URLSearchParams(window.location.search);
      // setPkmn(params.get('pkmn'));
      // console.log(pkmn);
      fetchJSON(`${BASE_URL}pokemon/${pkmn}`)
      .then(data => {
        setData(data);
        console.log(data);
      });
      // setShowDetail(true);
    },
    []
  );
  
  return (
    <div className="App">
      <header className="App-header"><h1>PokéDex</h1></header>
      <main>
        <aside>
          Evolution chain will go here!
          <a>1</a>
          <a>2</a>
          <a>3</a>
        </aside>
        {!showDetail ? <SummaryCard onclick={() => setTimeout(() => setShowDetail(true), 0)} data={data}/>
                     : <DetailCard onclick={() => setShowDetail(false)} data={data} />}
        <div></div>
      </main>
      <nav>
        <a href="?pkmn=1">Click here for Bulbasaur</a><br />
        <a href="?pkmn=4">Click here for Charmander</a><br />
        <a href="?pkmn=7">Click here for Squirtle</a><br />
        <a href="?pkmn=25">Click here for Pikachu</a><br />
        <a href="?pkmn=pichu">Click here for Pichu</a><br />
      </nav>
      <footer className="App-header">
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
