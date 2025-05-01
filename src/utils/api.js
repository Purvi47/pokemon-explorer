import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Fetch a Pokémon by name or ID
export const getPokemon = async (nameOrId) => {
  const res = await API.get(`/pokemon/${nameOrId}`);
  return res.data;
};

// Fetch evolution chain
export const getEvolutionChain = async (speciesUrl) => {
  const speciesRes = await axios.get(speciesUrl);
  const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
  return evoRes.data;
};
