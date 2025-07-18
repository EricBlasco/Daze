import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Daze.png'; // Ajusta la ruta según la ubicación de tu imagen

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        width: '100%',
        background: 'rgba(24,24,40,0.92)',
        borderBottom: '2px solid #e94560',
        boxShadow: '0 2px 16px #000a, 0 0 8px #e9456033 inset',
        padding: '0.5rem 0', // Reducido
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
        }}
      >
        {/* Logo y Nombre */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}> {/* Reducido */}
          <div style={{ width: '80px', height: '80px' }}> {/* Tamaño ajustado */}
            <img
              src={logo}
              alt="Daze Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span
            style={{
              fontFamily: "'UnifrakturCook', cursive",
              fontSize: '1.5rem', // Reducido
              color: '#e94560',
              letterSpacing: '2px',
              textShadow: '0 0 6px #e94560aa, 0 0 2px #fff',
            }}
          >
            Daze
          </span>
        </div>

        {/* Enlaces de Navegación */}
        <div style={{ display: 'flex', gap: '1.5rem' }}> {/* Ajustado */}
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#e94560' : '#fff',
              fontWeight: 'bold',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.2rem',
              textDecoration: 'none',
              borderBottom:
                location.pathname === '/' ? '2px solid #e94560' : '2px solid transparent',
              paddingBottom: 2,
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            Inicio
          </Link>
          <Link
            to="/playlists"
            style={{
              color: location.pathname === '/playlists' ? '#e94560' : '#fff',
              fontWeight: 'bold',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.2rem',
              textDecoration: 'none',
              borderBottom:
                location.pathname === '/playlists' ? '2px solid #e94560' : '2px solid transparent',
              paddingBottom: 2,
              transition: 'color 0.2s, border-bottom 0.2s',
            }}
          >
            Playlists
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;