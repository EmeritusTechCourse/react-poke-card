import React, { useState } from 'react';

export default function SummaryCard({onclick, data}) {
  return data ? <div className="SummaryCard card highlight" onClick={onclick}>
    <h2>{data.id} {data.species.name.toUpperCase()}</h2>
    <img className="SummaryImg" src={data.sprites.other['official-artwork'].front_default} alt="" />
    Click for more details
  </div> : <></>
};
