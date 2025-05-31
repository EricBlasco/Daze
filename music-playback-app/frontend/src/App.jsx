import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Playlists from './components/Playlists';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

const App = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
     vantaEffect.current = FOG({
  el: vantaRef.current,
  THREE: THREE,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  highlightColor: 0x000000,
  midtoneColor: 0x792897,
  lowlightColor: 0x211727,
  baseColor: 0xe85d80,       // ← rojo más rosado
  blurFactor: 0.6,
  speed: 1.0,
  zoom: 1.0,
  scale: 2.0,
  scaleMobile: 4.0
});
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
      {/* Fondo Vanta */}
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      />
      {/* Contenido principal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlists" element={<Playlists />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
