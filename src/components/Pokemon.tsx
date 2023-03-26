import { PokemonM } from '../models/PokemonM';
import '../assets/css/pokemon.css';

interface PokemonRender {
  pokemon: PokemonM
}

const typesColors: { [key: string]: string } = {
  "rock": '#b69e31',
  "ghost": '#70559b',
  "steel": '#b7b9d0',
  "water": '#6493eb',
  "grass": '#74cb48',
  "psychic": '#fb5584',
  "ice": '#9ad6df',
  "dark": '#75574c',
  "fairy": '#e69eac',
  "normal": '#aaa67f',
  "fighting": '#c12239',
  "flying": '#a891ec',
  "poison": '#a43e9e',
  "ground": '#dec16b',
  "bug": '#a7b723',
  "fire": '#f57d31',
  "electric": '#f9cf30',
  "dragon": '#7037ff'
}


export default function Pokemon({ pokemon }: PokemonRender) {
  return (
    <div className="card text-center">
      <div className="card-body ">
        <h5 className="card-title nombre">{pokemon.name}</h5>
        <h6 className="card-text text-right">#{pokemon.id}</h6>
        <img className="card-img-top" src={pokemon.image} alt="Img no found or return c:" />
        <p className="card-text mt-2">
          {pokemon.types.map((type: string, index) => {
            const hola = typesColors[type as string];
            return <span className="card-text type" style={{ background: `${hola}`, color: 'white' }} key={index} >{type} </span>

          })}</p>
        <p className="card-text text-left mb-0"> <span className='atributos'>Hp:</span>  {pokemon.hp}</p>
        <p className="card-text text-left mb-0"> <span className='atributos'>Attack:</span> {pokemon.attack}</p>
        <p className="card-text text-left mb-0"> <span className='atributos'>Height:</span>  {pokemon.height}</p>
        <p className="card-text text-left mb-0"> <span className='atributos'>Weight:</span> {pokemon.weight}</p>

        <p className='m-0  text-left'><span className='atributos'>Abilities: </span>
          {pokemon.abilities.map((ability: any, index) => (
            <span className="card-text habilidad m-0" key={index}>⭐{ability} </span>
          ))}
        </p>

      </div>
    </div>
  )
}
