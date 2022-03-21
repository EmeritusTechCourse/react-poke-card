import React, { useState } from 'react';
import { TYPE_ICONS } from '../App';

export default function DetailCard({onclick, data}) {
  return <div className="DetailCard card highlight" onClick={onclick}>
    <h2>{data.id} {data.species.name}</h2>
    <span>
      <img className="DetailImg" src={data.sprites.front_default} alt="" />
      <img className="DetailImg" src={data.sprites.back_default} alt="" />
      <img className="DetailImg" src={data.sprites.front_shiny} alt="" />
      <img className="DetailImg" src={data.sprites.back_shiny} alt="" />
    </span>
    <span>
      Type: {data.types.map(type => <img className="typeIcon" src={TYPE_ICONS[type.type.name]} key={type.type.name} />)}
    </span>
    <span>
      Ability: {data.abilities.map(ab => ' ' + ab.ability.name)+''}
    </span>
    <span>
      Base Stats: 
      <table><tbody>
        {data.stats.map(stat => <tr key={stat.stat.name}>
          <td>{stat.stat.name}</td>
          <td>{stat.base_stat}</td>
        </tr>)}
      </tbody></table>
    </span>
    Click to return to summary
  </div>
};
