import React, { useState, useEffect } from 'react';
import UploadSong from './UploadSong';
import GothicAudioPlayer from './GothicAudioPlayer';
import Search from './Search';
import VideoPlayer from './Player';

const Home = () => {
  // Guardar todas las canciones subidas
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem('songs');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSong, setCurrentSong] = useState(null);

  // Playlists: [{ name: string, songs: [songIndex, ...] }]
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem('playlists');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Video actual
  const [currentVideo, setCurrentVideo] = useState(null);

  // Guardar en localStorage cada vez que cambian las canciones o playlists
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);
  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  const getAudioUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:8000/${url.replace(/^\/+/, '')}`;
  };

  // Cuando se sube una canción, la añade a la lista
  const handleUpload = (songUrl, songName, imageUrl) => {
    const newSong = { url: songUrl, name: songName, image: imageUrl };
    setSongs((prev) => [...prev, newSong]);
    setCurrentSong(newSong); // Reproduce la última subida
  };

  // Eliminar una canción de la lista
  const handleDelete = (idx) => {
    setSongs((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      if (currentSong && prev[idx].url === currentSong.url) {
        setCurrentSong(null);
      }
      return updated;
    });
    // También elimina la canción de todas las playlists
    setPlaylists((prev) =>
      prev.map(pl => ({
        ...pl,
        songs: pl.songs.filter(i => i !== idx)
      }))
    );
  };

  // Crear nueva playlist
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    setPlaylists(prev => [...prev, { name: newPlaylistName.trim(), songs: [] }]);
    setNewPlaylistName('');
  };

  // Eliminar una playlist completa
  const handleDeletePlaylist = (playlistIdx) => {
    setPlaylists(prev => prev.filter((_, idx) => idx !== playlistIdx));
    if (selectedPlaylist === playlistIdx) setSelectedPlaylist(null);
  };

  // Añadir canción a playlist
  const handleAddToPlaylist = (playlistIdx, songIdx) => {
    setPlaylists(prev =>
      prev.map((pl, idx) =>
        idx === playlistIdx && !pl.songs.includes(songIdx)
          ? { ...pl, songs: [...pl.songs, songIdx] }
          : pl
      )
    );
  };

  // Eliminar canción de una playlist (solo de la playlist, no de la lista general)
  const handleRemoveFromPlaylist = (playlistIdx, songIdxInPlaylist) => {
    setPlaylists(prev =>
      prev.map((pl, idx) =>
        idx === playlistIdx
          ? { ...pl, songs: pl.songs.filter((_, i) => i !== songIdxInPlaylist) }
          : pl
      )
    );
  };

  // Obtener el índice de la canción actual
  const currentIndex = songs.findIndex(song => currentSong && song.url === currentSong.url);

  // Siguiente canción
  const handleNext = () => {
    if (songs.length === 0) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIdx]);
  };

  // Canción anterior
  const handlePrev = () => {
    if (songs.length === 0) return;
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIdx]);
  };

  // Canción aleatoria
  const handleRandom = () => {
    if (songs.length === 0) return;
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * songs.length);
    } while (songs.length > 1 && randIdx === currentIndex);
    setCurrentSong(songs[randIdx]);
  };

  // Fondo más negro para toda la app
  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0a0a0f 0%, #181828 100%)';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const buttonStyle = {
    background: 'linear-gradient(90deg, #23244d 60%, #e94560 100%)',
    color: '#fff',
    border: '2px solid #e94560',
    borderRadius: '8px',
    padding: '0.4rem 1.2rem',
    fontSize: '1rem',
    fontFamily: "'UnifrakturCook', cursive",
    letterSpacing: '1px',
    boxShadow: '0 2px 8px #0008, 0 0 8px #e9456033 inset',
    textShadow: '0 0 4px #e94560aa, 0 0 2px #fff',
    cursor: 'pointer',
    transition: 'background 0.2s'
  };

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
        Daze Media Player
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#bdbdbd' }}>
        Explora canciones, playlists y disfruta de tu música favorita.
      </p>
      <UploadSong onUpload={handleUpload} />

      {/* Crear playlist */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Crear nueva playlist</h3>
        <input
          type="text"
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
          placeholder="Nombre de la playlist"
        />
        <button onClick={handleCreatePlaylist} style={{ marginLeft: '1rem' }}>
          Crear
        </button>
      </div>

      {/* Listado de playlists */}
      {playlists.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Playlists:</h3>
          <ul>
            {playlists.map((pl, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedPlaylist(idx)}
                  className="icon-btn gothic"
                  style={{ marginRight: '1rem' }}
                  title="Ver playlist"
                >
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
                  className="boton-eliminar icon-btn gothic"
                  onClick={() => handleDeletePlaylist(idx)}
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
        </div>
      )}

      {/* Listado de canciones */}
      {songs.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Tus canciones subidas:</h3>
          <ul>
            {songs.map((song, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                {/* Imagen de la canción */}
                {song.image && (
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
                  {song.name}
                </span>
                <button
                  className="boton-eliminar icon-btn gothic"
                  onClick={() => handleDelete(idx)}
                  title="Eliminar"
                  style={{ marginLeft: '1rem' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="#e94560" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {/* Añadir a playlist */}
                {playlists.length > 0 && (
                  <select
                    defaultValue=""
                    onChange={e => {
                      if (e.target.value !== "") {
                        handleAddToPlaylist(Number(e.target.value), idx);
                        e.target.value = "";
                      }
                    }}
                    style={{ marginLeft: '1rem' }}
                  >
                    <option value="">Añadir a playlist...</option>
                    {playlists.map((pl, pidx) => (
                      <option key={pidx} value={pidx}>
                        {pl.name}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
        </div>
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
            {playlists[selectedPlaylist].songs.map((songIdx, idx) => (
              <li key={idx}>
                {songs[songIdx] ? (
                  <>
                    <button
                      onClick={() => setCurrentSong(songs[songIdx])}
                      className="play-btn"
                      title="Reproducir"
                    >
                      <svg viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="15" fill="none" stroke="#e94560" strokeWidth="2"/>
                        <polygon points="13,10 24,16 13,22" fill="#e94560"/>
                      </svg>
                    </button>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#fff' }}>
                      {songs[songIdx].name}
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
                  </>
                ) : (
                  <span style={{ color: 'gray' }}>(canción eliminada)</span>
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedPlaylist(null)} style={{ marginTop: '1rem' }}>
            Cerrar playlist
          </button>
        </div>
      )}

      {/* Reproductor personalizado */}
      {currentSong && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <GothicAudioPlayer
            src={getAudioUrl(currentSong.url)}
            title={currentSong.name}
            image={currentSong.image}
            autoPlay
            onEnded={handleNext}
          />
          {/* Botones debajo del reproductor */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            margin: '1.2rem 0 2rem 0',
            width: '100%'
          }}>
            <button onClick={handlePrev} style={buttonStyle}>Anterior</button>
            <button onClick={handleRandom} style={buttonStyle}>Aleatoria</button>
            <button onClick={handleNext} style={buttonStyle}>Siguiente</button>
          </div>
        </div>
      )}

      {/* Buscador y reproductor de video */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Buscar y reproducir video</h3>
        <Search onPlay={(url) => setCurrentVideo(url)} />
        {currentVideo && <VideoPlayer videoUrl={currentVideo} />}
      </div>
    </div>
  );
};

export default Home;