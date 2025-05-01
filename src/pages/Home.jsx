import React, { useContext, useState, useCallback, useMemo } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { pokemonList, loading } = useContext(PokemonContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('id');
  const [filterType, setFilterType] = useState('');
  const availableTypes = useMemo(() => ['normal', 'fire', 'water', 'grass', 'electric', 'psychic', 'fighting', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy', 'poison', 'ground', 'flying', 'ice'], []);
  const navigate = useNavigate();

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset page on sort
  }, []);

  const handleFilterChange = useCallback((event) => {
    setFilterType(event.target.value);
    setCurrentPage(1); // Reset page on filter
  }, []);

  const handleRandomPokemon = useCallback(() => {
    if (pokemonList && pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemonId = pokemonList[randomIndex].id;
      navigate(`/pokemon/${randomPokemonId}`);
    }
  }, [pokemonList, navigate]);

  const sortedPokemon = useMemo(() => {
    return [...pokemonList].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'id') {
        return a.id - b.id;
      }
      return 0;
    });
  }, [pokemonList, sortBy]);

  const filteredPokemon = useMemo(() => {
    return filterType
      ? sortedPokemon.filter(pokemon => pokemon.types.some(typeInfo => typeInfo.type.name === filterType))
      : sortedPokemon;
  }, [sortedPokemon, filterType]);

  const start = useMemo(() => (currentPage - 1) * perPage, [currentPage, perPage]);
  const paginated = useMemo(() => filteredPokemon.slice(start, start + perPage), [filteredPokemon, start, perPage]);
  const totalPages = useMemo(() => Math.ceil(filteredPokemon.length / perPage), [filteredPokemon.length, perPage]);

  if (loading) return <p style={loadingStyle}>Loading...</p>;

  return (
    <div style={homeContainer}>
      <div style={filterSortContainer}>
        <div style={selectContainer}>
          <label htmlFor="itemsPerPage" style={labelStyle}>Items per page:</label>
          <select id="itemsPerPage" style={selectStyle} value={perPage} onChange={e => setPerPage(Number(e.target.value))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <div style={selectContainer}>
          <label htmlFor="sortBy" style={labelStyle}>Sort by:</label>
          <select id="sortBy" style={selectStyle} value={sortBy} onChange={handleSortChange}>
            <option value="id">ID</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        <div style={selectContainer}>
          <label htmlFor="filterType" style={labelStyle}>Filter by Type:</label>
          <select id="filterType" style={selectStyle} value={filterType} onChange={handleFilterChange}>
            <option value="">All Types</option>
            {availableTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button style={randomButton} onClick={handleRandomPokemon}>
          Random Pokémon
        </button>
      </div>

      <div style={cardGrid}>
        {paginated.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div style={paginationContainer}>
        <button
          style={paginationButtonStyle}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
        >
          Prev
        </button>
        <span style={pageNumberStyle}>Page: {currentPage} / {totalPages}</span>
        <button
          style={paginationButtonStyle}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Styles for Home component
const homeContainer = {
  padding: '20px',
  fontFamily: 'sans-serif',
};

const filterSortContainer = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
};

const selectContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const labelStyle = {
  marginRight: '5px',
  fontWeight: 'bold',
};

const selectStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const cardGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '20px',
};

const paginationContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
};

const paginationButtonStyle = {
  padding: '8px 16px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

const pageNumberStyle = {
  fontSize: '1em',
};

const loadingStyle = {
  textAlign: 'center',
  fontSize: '1.2em',
  marginTop: '20px',
};

const randomButton = {
  padding: '10px 15px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
};

export default Home;