import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonList = async () => {
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=150`);
      const pokemonData = await Promise.all(result.data.results.map(p => axios.get(p.url)));
      setPokemonList(pokemonData.map(res => res.data));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonList, loading }}>
      {children}
    </PokemonContext.Provider>
  );
};
