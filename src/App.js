import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import PokemonCard from './components/PokemonCard';
import './index.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemonList(detailedData);
        setFilteredList(detailedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch Pokémon data.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === typeFilter)
      );
    }

    setFilteredList(filtered);
  }, [searchTerm, typeFilter, pokemonList]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <Header />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <div className="cards">
        {filteredList.length ? (
          filteredList.map((p) => <PokemonCard key={p.id} pokemon={p} />)
        ) : (
          <div className="empty">No Pokémon found.</div>
        )}
      </div>
    </div>
  );
};

export default App;
