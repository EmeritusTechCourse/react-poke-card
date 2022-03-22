// import React from 'react';
import { TYPE_ICONS } from '../App';

export default function DetailCard({onclick, pkmnData, speciesData}) {
  return <div className="DetailCard card" onClick={onclick}>
    <h2>{speciesData.name} #{speciesData.id.toString().padStart(3, '0')}</h2>
    <span>
      <img className="detailImg" src={pkmnData.sprites.front_default} alt="" />
      <img className="detailImg" src={pkmnData.sprites.back_default} alt="" />
      <img className="detailImg" src={pkmnData.sprites.front_shiny} alt="" />
      <img className="detailImg" src={pkmnData.sprites.back_shiny} alt="" />
    </span>
    <span>
      <b>Type: </b>
      {pkmnData.types.map(t =>
        <img className="typeIcon"
          src={TYPE_ICONS[t.type.name]}
          alt={t.type.name.toUpperCase()}
          key={t.type.name} />
      )}
    </span>
    <span>
      <b>Ability: </b>
      {pkmnData.abilities.map(a => ' ' + a.ability.name.replaceAll('-', ' ').toStartCase()) + ''}
    </span>
    <table className="statsTable">
      <thead>
        <tr>
          <th>
            Stat
          </th>
          <th>
            Base Value
          </th>
          <th>
            Effort Value
          </th>
        </tr>
      </thead>
      <tbody>
        {pkmnData.stats.map(s =>
          <tr key={s.stat.name}>
            <td>{s.stat.name.replaceAll('-', ' ')}</td>
            <td>{s.base_stat}</td>
            <td>{s.effort}</td>
          </tr>)}
      </tbody>
    </table>
    <span>
      Click to return to summary
    </span>
  </div>
};
