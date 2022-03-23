import {useState, useEffect} from 'react';
import {BASE_URL, fetchJSON} from '../App';

export default function PkmnLink({string}) {
  // console.log(string);

  const [pkmnData, setPkmnData] = useState();
  const [speciesData, setSpeciesData] = useState();

  // useEffect(() => {
  //   fetchJSON(`${BASE_URL}pokemon/${string}`)
  //     .then(pData => {
  //       setPkmnData(pData);
  //       fetchJSON(pData.species.url)
  //         .then(sData => {
  //           setSpeciesData(sData);
  //         });
  //     });
  // });

  return (
    <a className="PkmnLink"
    href={'?pkmn=' + string}>

      {string}
      <img className="LinkImg"
        src=""
      />
    </a>
  );
  // return '';
};
