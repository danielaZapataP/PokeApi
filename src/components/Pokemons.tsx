import React, { useEffect, useState } from 'react';
import { url } from '../utils/urls';
import { PokemonM } from '../models/PokemonM';
import Pokemon from './Pokemon';

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("name");


  useEffect(() => {
    async function fetchPokemons() {
      const response = await fetch(`${url}?limit=250`);
      const data = await response.json();


      const pokemonList: any = await Promise.all(data.results.map(async (pokemon: any) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types.map((type: any) => type.type.name),
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities.map((ability: any) => ability.ability.name),
          image: pokemonData.sprites.other.home.front_default,
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat
        }
      }));
      setPokemons(pokemonList);
    }

    fetchPokemons();
  }, []);

  const filtrar = (entrada: string) => {
    setBusqueda(entrada);
  }
  const filter_pokemon = pokemons.filter((pokemon: PokemonM) => {
    if (categoria === 'name') {
      return pokemon.name.toLowerCase().match(busqueda.toLowerCase());
    } else if (categoria ==='type') {
      return pokemon.types[0].toLowerCase().match(busqueda.toLowerCase()) || pokemon.types[0].toLowerCase().match(busqueda.toLowerCase());
    } else if (categoria ==='id') {
      return pokemon.id === Number(busqueda);
    }
    
  })

  return (
    <div className='container-fluid '>
      <header className='row pb-1' style={{ backgroundColor: 'red' }}>
        <img className='img-fluid col-md-3 col-5 mr-md-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
        <div className='col-md-5 col-7 d-flex align-items-center '>
          <input className='align-middle busqueda form-control m-1' type="text" onChange={e =>filtrar(e.target.value)}/>
          {/* pa borrar si algo */}
          <select className='col-2 m-1 form-control' name="select" id='bodega' onChange={e =>setCategoria(e.target.value)}>
            <option value="name">Name</option>
            <option value="id">Id</option>
            <option value="type">Type</option>
          </select>
        </div>
      </header>


      <div className='row justify-content-center'>
        {filter_pokemon.map((pokemon: PokemonM, index) => (
          <Pokemon pokemon={pokemon} key={index} />
        ))}
      </div>
    </div>
  );

}



