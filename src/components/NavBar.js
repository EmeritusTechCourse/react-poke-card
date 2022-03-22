import PkmnLink from "./PkmnLink";

export default function NavBar({pkmnList}, searchString) {
  // console.log(pkmnList);
  // if (pkmnList) console.log(pkmnList[0]);
  searchString = 'char';
  if (pkmnList) return (
    <nav>
      {pkmnList
        .filter((pkmn, i) => i < 25)
        .map(pkmn => <PkmnLink string={pkmn.name} key={pkmn.name} />)
      }
    </nav>
  );
  return '';
};
