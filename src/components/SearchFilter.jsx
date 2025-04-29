const SearchFilter = ({ searchTerm, setSearchTerm, typeFilter, setTypeFilter }) => {
    const types = [
      '', 'normal', 'fire', 'water', 'grass', 'electric', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];
  
    return (
      <div className="filters">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All Types'}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SearchFilter;
  