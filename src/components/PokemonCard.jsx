import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../contexts/FavoritesContext';

const PokemonCard = ({ pokemon }) => {
  const { toggleFavorite, favorites } = useContext(FavoritesContext);
  const isFav = favorites.some(p => p.id === pokemon.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimatingFav, setIsAnimatingFav] = useState(false);

  const handleFavoriteClick = () => {
    setIsAnimatingFav(true);
    toggleFavorite(pokemon);
    setTimeout(() => setIsAnimatingFav(false), 300); // Reset animation after a short delay
  };

  const favoriteButtonClass = isAnimatingFav ? 'animate-favorite' : '';

  return (
    <div
      style={{
        ...cardStyle,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/pokemon/${pokemon.id}`} style={linkStyle}>
        <h3 style={nameStyle}>{pokemon.name}</h3>
        <div style={imageContainer}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={imageStyle} />
        </div>
      </Link>
      <button
        style={{
          ...favoriteButtonStyle,
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={handleFavoriteClick}
        className={favoriteButtonClass}
      >
        <span style={{
          fontSize: '1.5em',
          color: isFav ? '#ffea00' : '#ccc',
          transition: 'transform 0.2s ease-in-out',
          transform: isAnimatingFav ? 'scale(1.2)' : 'scale(1)',
        }}>
          {isFav ? '★' : '☆'}
        </span>
      </button>
    </div>
  );
};

// Styles for PokemonCard component
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const nameStyle = {
  marginBottom: '10px',
  textTransform: 'capitalize',
  fontSize: '1.2em',
};

const imageContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
};

const favoriteButtonStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#6c757d',
  color: '#333',
  cursor: 'pointer',
  fontSize: '1em',
};

export default PokemonCard;