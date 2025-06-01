import React, { useState, useRef } from 'react';

const UploadSong = ({ onUpload }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const audioInputRef = useRef();
  const imageInputRef = useRef();

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile || !imageFile) {
      setMessage('Selecciona una canción y una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Canción subida correctamente');
        // Usa la URL real del backend
        const imageUrl = `http://localhost:8000/${data.imagePath}`;
        if (onUpload) onUpload(data.path, audioFile.name, imageUrl);
      } else {
        setMessage(data.detail || 'Error al subir la canción');
      }
    } catch (err) {
      setMessage('Error de conexión');
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <form onSubmit={handleUpload} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Input de audio */}
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          ref={audioInputRef}
          style={{ display: 'none' }}
          id="audio-upload"
        />
        <button
          type="button"
          onClick={() => audioInputRef.current.click()}
          style={{
            background: 'linear-gradient(90deg, #23244d 60%, #e94560 100%)',
            color: '#fff',
            border: '2px solid #e94560',
            borderRadius: '8px',
            padding: '0.5rem 1.3rem',
            fontSize: '1.1rem',
            fontFamily: "'UnifrakturCook', cursive",
            letterSpacing: '1px',
            boxShadow: '0 2px 8px #0008, 0 0 8px #e9456033 inset',
            textShadow: '0 0 4px #e94560aa, 0 0 2px #fff',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          {audioFile ? 'Canción: ' + audioFile.name : 'Seleccionar canción'}
        </button>

        {/* Input de imagen */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageInputRef}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <button
          type="button"
          onClick={() => imageInputRef.current.click()}
          style={{
            background: 'linear-gradient(90deg, #23244d 60%, #e94560 100%)',
            color: '#fff',
            border: '2px solid #e94560',
            borderRadius: '8px',
            padding: '0.5rem 1.3rem',
            fontSize: '1.1rem',
            fontFamily: "'UnifrakturCook', cursive",
            letterSpacing: '1px',
            boxShadow: '0 2px 8px #0008, 0 0 8px #e9456033 inset',
            textShadow: '0 0 4px #e94560aa, 0 0 2px #fff',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          {imageFile ? 'Imagen seleccionada' : 'Seleccionar imagen'}
        </button>

        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadSong;