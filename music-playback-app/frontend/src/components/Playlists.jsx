import React, { useState, useEffect } from 'react';
import GothicAudioPlayer from './GothicAudioPlayer';

const Playlists = () => {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('playlists');
    return saved ? JSON.parse(saved) : [];
  });
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem('songs');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const getAudioUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:8000/${url.replace(/^\/+/, '')}`;
  };

  // Eliminar playlist
  const handleDeletePlaylist = (playlistIdx) => {
    setPlaylists(prev => {
      const updated = prev.filter((_, idx) => idx !== playlistIdx);
      localStorage.setItem('playlists', JSON.stringify(updated));
      return updated;
    });
    if (selectedPlaylist === playlistIdx) setSelectedPlaylist(null);
  };

  // Eliminar canción de playlist
  const handleRemoveFromPlaylist = (playlistIdx, songIdxInPlaylist) => {
    setPlaylists(prev => {
      const updated = prev.map((pl, idx) =>
        idx === playlistIdx
          ? { ...pl, songs: pl.songs.filter((_, i) => i !== songIdxInPlaylist) }
          : pl
      );
      localStorage.setItem('playlists', JSON.stringify(updated));
      return updated;
    });
  };

  // --- NUEVO: Controles de reproducción para la playlist seleccionada ---
  const playlistSongs = selectedPlaylist !== null && playlists[selectedPlaylist]
    ? playlists[selectedPlaylist].songs.map(idx => songs[idx]).filter(Boolean)
    : [];

  const currentIndex = playlistSongs.findIndex(song => currentSong && song && song.url === currentSong.url);

  const handleNext = () => {
    if (playlistSongs.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlistSongs.length;
    setCurrentSong(playlistSongs[nextIdx]);
  };

  const handlePrev = () => {
    if (playlistSongs.length === 0) return;
    const prevIdx = (currentIndex - 1 + playlistSongs.length) % playlistSongs.length;
    setCurrentSong(playlistSongs[prevIdx]);
  };

  const handleRandom = () => {
    if (playlistSongs.length === 0) return;
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * playlistSongs.length);
    } while (playlistSongs.length > 1 && randIdx === currentIndex);
    setCurrentSong(playlistSongs[randIdx]);
  };

  // Si se cambia de playlist, resetea la canción actual
  useEffect(() => {
    setCurrentSong(null);
  }, [selectedPlaylist]);

  return (
    <div className="container" style={{
      padding: '2rem',
      maxWidth: 700,
      margin: '0 auto',
      background: 'rgba(10,10,15,0.98)',
      borderRadius: '18px',
      boxShadow: '0 4px 32px #000b'
    }}>
      <h1 className="daze-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Tus Playlists
      </h1>
      {playlists.length === 0 && <p>No tienes playlists creadas.</p>}
      {playlists.length > 0 && (
        <ul>
          {playlists.map((pl, idx) => (
            <li key={idx}>
              <button onClick={() => setSelectedPlaylist(idx)} className="icon-btn gothic" style={{ marginRight: '1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M7 20V8l10-2v12" stroke="#e94560" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="20" r="2" fill="#e94560" />
                  <circle cx="17" cy="20" r="2" fill="#e94560" />
                </svg>
              </button>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff' }}>
                {pl.name} ({pl.songs.length} canciones)
              </span>
              <button
                onClick={() => handleDeletePlaylist(idx)}
                className="boton-eliminar icon-btn gothic"
                title="Eliminar playlist"
                style={{ marginLeft: '1rem' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="#e94560" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Canciones de la playlist seleccionada */}
      {selectedPlaylist !== null && playlists[selectedPlaylist] && (
        <div style={{
          marginTop: '2rem',
          background: '#101017',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: '0 2px 16px #000b'
        }}>
          <h3>Playlist: {playlists[selectedPlaylist].name}</h3>
          <ul>
            {playlistSongs.length === 0 && <li style={{ color: 'gray' }}>No hay canciones en esta playlist.</li>}
            {playlistSongs.map((song, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                {song && song.image && (
                  <img
                    src={song.image}
                    alt={song.name}
                    style={{
                      width: 38,
                      height: 38,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginRight: 12,
                      boxShadow: '0 1px 4px #000a'
                    }}
                  />
                )}
                <button
                  onClick={() => setCurrentSong(song)}
                  className="play-btn"
                  title="Reproducir"
                >
                  <svg viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="15" fill="none" stroke="#e94560" strokeWidth="2"/>
                    <polygon points="13,10 24,16 13,22" fill="#e94560"/>
                  </svg>
                </button>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff' }}>
                  {song ? song.name : <span style={{ color: 'gray' }}>(canción eliminada)</span>}
                </span>
                <button
                  className="boton-eliminar icon-btn gothic"
                  onClick={() => handleRemoveFromPlaylist(selectedPlaylist, idx)}
                  title="Eliminar de la playlist"
                  style={{ marginLeft: '1rem' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="#e94560" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedPlaylist(null)} style={{ marginTop: '1rem' }}>
            Cerrar playlist
          </button>

          {/* Reproductor y controles SOLO si hay canciones */}
          {playlistSongs.length > 0 && currentSong && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1.5rem 0 1rem 0' }}>
                <button onClick={handlePrev}>Anterior</button>
                <button onClick={handleRandom}>Aleatoria</button>
                <button onClick={handleNext}>Siguiente</button>
              </div>
              <GothicAudioPlayer
                src={getAudioUrl(currentSong.url)}
                title={currentSong.name}
                image={currentSong.image}
                autoPlay
                onEnded={handleNext}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Playlists;