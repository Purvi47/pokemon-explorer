import React from 'react';

const CompareModal = ({ pokemon1, pokemon2, onClose }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: 0,
    animation: 'fadeIn 0.3s ease-out forwards',
  };

  const modalStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '800px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    opacity: 0,
    transform: 'translateY(-20px)',
    animation: 'slideIn 0.3s ease-out 0.1s forwards',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
    gap: '1rem',
  };

  const cardStyle = {
    width: '45%',
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const imageStyle = {
    maxWidth: '150px',
    height: 'auto',
    marginBottom: '1rem',
  };

  const statsContainerStyle = {
    width: '100%',
  };

  const statStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.3rem 0',
    borderBottom: '1px solid #eee',
  };

  const statNameStyle = {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  };

  const statValueStyle = {
    color: '#007bff',
  };

  const closeButtonStyle = {
    marginTop: '1.5rem',
    padding: '0.8rem 1.2rem',
    fontSize: '1.1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
  };

  const keyframesFadeIn = `@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }`;

  const keyframesSlideIn = `@keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }`;

  return (
    <div style={overlayStyle}>
      <style>{keyframesFadeIn}</style>
      <style>{keyframesSlideIn}</style>
      <div style={modalStyle}>
        <h2>Pokémon Comparison</h2>
        <div style={contentStyle}>
          {[pokemon1, pokemon2].map((pokemon, i) => (
            <div key={i} style={cardStyle}>
              <h3>{pokemon.name.toUpperCase()}</h3>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} style={imageStyle} />
              <div style={statsContainerStyle}>
                {pokemon.stats.map(stat => (
                  <p key={stat.stat.name} style={statStyle}>
                    <strong style={statNameStyle}>{stat.stat.name}:</strong>
                    <span style={statValueStyle}>{stat.base_stat}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
};

export default CompareModal;