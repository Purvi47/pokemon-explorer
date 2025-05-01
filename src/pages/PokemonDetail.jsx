import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(pokemonData.data);

        const speciesData = await axios.get(pokemonData.data.species.url);
        setSpecies(speciesData.data);

        if (speciesData.data.evolution_chain) {
          const evolutionChainData = await axios.get(speciesData.data.evolution_chain.url);
          setEvolutionChain(evolutionChainData.data);
        }
      } catch (err) {
        console.error('Error fetching Pokémon details:', err);
        setError('Failed to load Pokémon details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p style={loadingStyle}>Loading Pokémon details...</p>;
  if (error) return <p style={errorStyle}>Error: {error}</p>;
  if (!pokemon) return <p style={notFoundStyle}>Pokémon not found.</p>;

  const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', grass: '#7AC74C', electric: '#F7D02C',
    psychic: '#F95587', fighting: '#C22E28', bug: '#A6B91A', rock: '#B6A136', ghost: '#735797',
    dragon: '#6F35FC', steel: '#B7B7CE', dark: '#705746', fairy: '#D685AD', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', ice: '#96D9D6',
  };

  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>Back to List</Link>
      <h2 style={nameStyle}>{pokemon.name.toUpperCase()}</h2>

      <div style={headerInfo}>
        <div style={imageContainer}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={imageStyle} />
          <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} style={shinyImageStyle} />
        </div>
        <div style={infoText}>
          {pokemon.types && (
            <p style={typesStyle}>
              Types: {pokemon.types.map(typeInfo => (
                <span key={typeInfo.type.name} style={{ ...typeBadgeStyle, backgroundColor: typeColors[typeInfo.type.name] }}>
                  {typeInfo.type.name}
                </span>
              ))}
            </p>
          )}
          {species && (
            <p style={hwStyle}>
              Height: {(species.height / 10).toFixed(1)} m, Weight: {(species.weight / 10).toFixed(1)} kg
            </p>
          )}
        </div>
      </div>

      <div style={detailsGrid}>
        <div style={section}>
          <h3 style={headingStyle}>Stats</h3>
          <ul style={listStyle}>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name} style={listItemStyle}>
                <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div style={section}>
          <h3 style={headingStyle}>Abilities</h3>
          <ul style={listStyle}>
            {pokemon.abilities.map(ability => (
              <li key={ability.ability.name} style={listItemStyle}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div style={section}>
          <h3 style={headingStyle}>Moves</h3>
          <ul style={listStyle}>
            {pokemon.moves.slice(0, 10).map(move => (
              <li key={move.move.name} style={listItemStyle}>{move.move.name}</li>
            ))}
            {pokemon.moves.length > 10 && <p style={moreMovesStyle}>...and {pokemon.moves.length - 10} more moves</p>}
          </ul>
        </div>

        {evolutionChain && (
          <div style={section}>
            <h3 style={headingStyle}>Evolution Chain</h3>
            <p style={evolutionTextStyle}>{renderEvolutionChain(evolutionChain.chain)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const renderEvolutionChain = (chain) => {
  const evolutionNodes = [];
  let current = chain;

  while (current) {
    evolutionNodes.push(current.species.name);
    if (current.evolves_to.length > 0) {
      evolutionNodes.push('→');
      current = current.evolves_to[0]; 
    } else {
      current = null;
    }
  }

  return evolutionNodes.join(' ');
};

const containerStyle = { padding: '20px', fontFamily: 'sans-serif' };
const backLinkStyle = { display: 'block', marginBottom: '20px', color: '#007bff', textDecoration: 'none' };
const nameStyle = { fontSize: '2.5em', marginBottom: '20px', textAlign: 'center', textTransform: 'uppercase' };
const headerInfo = { display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' };
const imageContainer = { display: 'flex', gap: '20px', alignItems: 'center' };
const imageStyle = { maxWidth: '150px', height: 'auto' };
const shinyImageStyle = { maxWidth: '100px', height: 'auto', opacity: 0.7 };
const infoText = { textAlign: 'center' }; 
const typesStyle = { marginBottom: '5px' };
const typeBadgeStyle = { display: 'inline-block', padding: '8px 12px', borderRadius: '8px', color: 'white', margin: '0 5px', fontSize: '1em', fontWeight: 'bold' };
const hwStyle = { margin: '5px 0', fontSize: '1.1em' };
const detailsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' };
const section = { padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' };
const headingStyle = { fontSize: '1.8em', marginTop: '0', marginBottom: '15px', borderBottom: '2px solid #ccc', paddingBottom: '5px' };
const listStyle = { listStyleType: 'none', paddingLeft: '0' };
const listItemStyle = { margin: '8px 0', fontSize: '1.1em' };
const moreMovesStyle = { marginTop: '10px', color: '#777', fontSize: '1em' };
const evolutionTextStyle = { fontSize: '1.1em', lineHeight: '1.5' };
const loadingStyle = { textAlign: 'center', fontSize: '1.2em', marginTop: '20px' };
const errorStyle = { color: 'red', textAlign: 'center', marginTop: '20px' };
const notFoundStyle = { textAlign: 'center', marginTop: '20px' };

export default PokemonDetail;