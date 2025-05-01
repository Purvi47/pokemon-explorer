import React from 'react';

const types = [
  'grass', 'fire', 'water', 'bug', 'normal',
  'poison', 'electric', 'ground', 'fairy', 'fighting',
  'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'flying'
];

const Filters = ({ selectedTypes, setSelectedTypes }) => {
  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div>
      <h3>Filter by Types:</h3>
      {types.map(type => (
        <label key={type} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => toggleType(type)}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default Filters;
