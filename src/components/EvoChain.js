import React from 'react';


export default function EvoChain ({pkmnData, speciesData, evoData}) {

  return  evoData[0] ?
  <div className='EvoChain'>
    <h2>Evolution Chain</h2>
    <div>
        Base Pokemon:
    </div>
    <div className='Evolution' >
      <span>
        <div>
          {evoData[0][0].name}
        </div>
          <img className="detailImg" src={evoData[0][0].sprite} alt="" onClick={() => window.location.replace(`?pkmn=${evoData[0][0].name.toLowerCase()}`)}/>
      </span>
    </div>


    {evoData[1][0] ? <div>
      <div>
        Evolution level 2:
      </div>
      <div className='Evolution' >
        {evoData[1].map(pkmn => (
          <span key={pkmn.name}>
            <div>
              {pkmn.name}
            </div>
            <img className="detailImg" src={pkmn.sprite} alt=""  onClick={() => window.location.replace(`?pkmn=${pkmn.name.toLowerCase()}`)}/>
          </span>
        ))}
      </div>
    </div> : <></>}

    {evoData[2][0] ? <div>
      <div>
        Evolution level 3:
      </div>
      <div className='Evolution' >
        {evoData[2].map(pkmn => (
          <span key={pkmn.name}>
            <div>
              {pkmn.name}
            </div>
            <img className="detailImg" src={pkmn.sprite} alt=""  onClick={() => window.location.replace(`?pkmn=${pkmn.name.toLowerCase()}`)}/>
          </span>
        ))}
      </div>
    </div> : <></>}

  </div> :

  <></>;
};
