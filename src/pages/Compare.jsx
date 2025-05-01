import React, { useState } from 'react';
import { getPokemon } from '../utils/api';
import CompareModal from '../components/CompareModal';

const Compare = () => {
  const [pokeName1, setPokeName1] = useState('');
  const [pokeName2, setPokeName2] = useState('');
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    if (!pokeName1 || !pokeName2 || pokeName1.trim() === '' || pokeName2.trim() === '' || pokeName1.toLowerCase() === pokeName2.toLowerCase()) {
      setError('Please enter two different Pokémon names.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const [data1, data2] = await Promise.all([
        getPokemon(pokeName1.toLowerCase().trim()),
        getPokemon(pokeName2.toLowerCase().trim())
      ]);
      setPokemon1(data1);
      setPokemon2(data2);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setError('One or both Pokémon names are invalid.');
      setPokemon1(null);
      setPokemon2(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPokeName1('');
    setPokeName2('');
    setPokemon1(null);
    setPokemon2(null);
    setError('');
  };

  const containerStyle = {
    padding: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '100%',
    marginTop: '2rem',
    gap: '1.2rem',
  };

  const inputStyle = {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    padding: '0.8rem 1.2rem',
    fontSize: '1.1rem',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
  };

  const resetButtonstyle = {
    ...buttonStyle,
    backgroundColor: '#f8f9fa',
    color: '#333',
    border: '1px solid #ccc',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h2>Compare Pokémon Stats</h2>
      <div style={formStyle}>
        <input
          placeholder="Enter first Pokémon"
          value={pokeName1}
          onChange={(e) => setPokeName1(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Enter second Pokémon"
          value={pokeName2}
          onChange={(e) => setPokeName2(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={errorStyle}>{error}</p>}
        <button onClick={handleCompare} style={buttonStyle} disabled={loading}>
          {loading ? 'Loading...' : 'Compare'}
        </button>
        <button onClick={reset} style={resetButtonstyle}>
          Reset
        </button>
      </div>

      {pokemon1 && pokemon2 && (
        <CompareModal
          pokemon1={pokemon1}
          pokemon2={pokemon2}
          onClose={() => {
            setPokemon1(null);
            setPokemon2(null);
          }}
        />
      )}
    </div>
  );
};

export default Compare;