import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom'; // If you use links on this page

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const favoritesListStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: favorites.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: favorites.length === 1 ? 'center' : 'start', // Center if only one item
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: favorites.length === 1 ? 'fit-content' : 'auto', // Adjust width for single item
    margin: favorites.length === 1 ? '0 auto' : '0', // Center the item
  };

  return (
    <div style={favoritesContainer}>
      <h2 style={pageTitle}>Your Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <p style={emptyMessage}>No favorites yet!</p>
      ) : (
        <ul style={favoritesListStyle}>
          {favorites.map(pokemon => (
            <li key={pokemon.id} style={listItemStyle}>
              <Link to={`/pokemon/${pokemon.id}`} style={pokemonLink}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} style={pokemonImage} />
                <span style={pokemonName}>{pokemon.name}</span>
              </Link>
              <button style={removeButtonStyle} onClick={() => toggleFavorite(pokemon)}>
                Remove ★
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const favoritesContainer = {
  padding: '20px',
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const pageTitle = {
  fontSize: '2em',
  marginBottom: '20px',
  color: '#333',
};

const emptyMessage = {
  fontSize: '1.1em',
  color: '#777',
};

const pokemonLink = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '10px',
};

const pokemonImage = {
  maxWidth: '100px',
  height: 'auto',
  marginBottom: '5px',
};

const pokemonName = {
  textTransform: 'capitalize',
  fontWeight: 'bold',
};

const removeButtonStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#dc3545', // Red color for remove
  color: 'white',
  cursor: 'pointer',
  fontSize: '1em',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: '#c82333',
  },
};

export default Favorites;