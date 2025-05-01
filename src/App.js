import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import { PokemonProvider } from './contexts/PokemonContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <PokemonProvider>
      <FavoritesProvider>
        <ErrorBoundary>
          <nav style={navbarStyle}>
            <Link to="/" style={navLinkStyle}>Home</Link>
            <span style={separatorStyle}>|</span>
            <Link to="/favorites" style={navLinkStyle}>Favorites</Link>
            <span style={separatorStyle}>|</span>
            <Link to="/compare" style={navLinkStyle}>Compare</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </ErrorBoundary>
      </FavoritesProvider>
    </PokemonProvider>
  );
}

const navbarStyle = {
  backgroundColor: '#f8f9fa', // Light gray background
  padding: '10px 20px',
  borderBottom: '1px solid #dee2e6',
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#007bff', // Blue link color
  fontWeight: 'bold',
  fontSize: '1.1em',
  transition: 'color 0.3s ease',

  '&:hover': {
    color: '#0056b3', // Darker blue on hover
  },
};

const separatorStyle = {
  color: '#ccc',
  margin: '0 5px',
};

export default App;