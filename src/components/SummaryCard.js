// import React, { useState } from 'react';
import { ROUND_TYPE_ICONS } from '../App';

export default function SummaryCard({onclick, pkmnData, speciesData}) {
  if (pkmnData && speciesData) return (
    <div className="SummaryCard card" onClick={onclick}>
      <div className="summaryTop">
        <h2>
          <span>&nbsp;{speciesData.name}</span>
          <span>
            {pkmnData.types.map(t =>
              <img className="roundTypeIcon"
                src={ROUND_TYPE_ICONS[t.type.name]}
                alt=''
                key={t.type.name} />
            )}
          </span>
        </h2>
        <img className="summaryImg"
          src={pkmnData.sprites.other['official-artwork'].front_default}
          alt="" />
        <div className="summaryCaption">
          <span>
            NO. {speciesData.id.toString().padStart(3, '0')}
          </span>
          <span>
            {speciesData.genera[7].genus}
          </span>
          <span>
            HT: {Math.trunc(Math.round(pkmnData.height / 0.254) / 12)}'
            {(Math.round(pkmnData.height / 0.254) % 12).toString().padStart(2, '0')}"
          </span>
          <span>
            WT: {Math.round(pkmnData.weight / 0.45359237) / 10} lbs.
          </span>
        </div>
      </div>
      <span className="flavorText">
        {speciesData
          .flavor_text_entries
          .find(obj => obj.language.name === 'en')
          .flavor_text
          .replaceAll('\f', ' ')}
      </span>
      <span>
        Click for more details
      </span>
    </div>
  );
  return '';
};
