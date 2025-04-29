import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card interactive">
      <div className="pokemon-front">
        <img
          className="pokemon-image"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h3 className="pokemon-name">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((t, index) => (
            <span key={index} className={`type-badge type-${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

// const PokemonCard = ({ pokemon }) => {
//     return (
//       <div className="card">
//         <h3>#{pokemon.id} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
//         <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//         <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
//       </div>
//     );
//   };
  
//   export default PokemonCard;
  