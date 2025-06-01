import React, { useRef, useState, useEffect } from 'react';

const GothicAudioPlayer = ({ src, title, image, autoPlay, onEnded }) => {
    const audioRef = useRef();
    const progressBarRef = useRef();
    const volumeBarRef = useRef();
    const [playing, setPlaying] = useState(!!autoPlay);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setProgress(0);
            setDuration(audioRef.current.duration || 0);
            audioRef.current.volume = 1;
            setVolume(1);
        }
    }, [src]);

    useEffect(() => {
        if (autoPlay && audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }
    }, [src, autoPlay]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setProgress(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration || 0);
        audioRef.current.currentTime = 0;
        setProgress(0);
    };

    const handleSeek = (e) => {
        const value = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setProgress(value);
        }
    };

    // Click en la barra de progreso
    const handleProgressBarClick = (e) => {
        const bar = progressBarRef.current;
        if (!bar || !audioRef.current) return;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percent * duration;
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    // Drag preciso en barra de progreso
    const handleProgressBarMouseDown = (e) => {
        const bar = progressBarRef.current;
        if (!bar || !audioRef.current) return;
        const move = (ev) => {
            const rect = bar.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const percent = Math.max(0, Math.min(1, x / rect.width));
            const newTime = percent * duration;
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        };
        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        move(e);
    };

    const handleProgressBarTouchStart = (e) => {
        const bar = progressBarRef.current;
        if (!bar || !audioRef.current || !e.touches[0]) return;
        const move = (ev) => {
            if (!ev.touches[0]) return;
            const rect = bar.getBoundingClientRect();
            const x = ev.touches[0].clientX - rect.left;
            const percent = Math.max(0, Math.min(1, x / rect.width));
            const newTime = percent * duration;
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        };
        const up = () => {
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', up);
        };
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', up);
        move(e);
    };

    const handleVolume = (e) => {
        const value = Number(e.target.value);
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    // Click en la barra de volumen
    const handleVolumeBarClick = (e) => {
        const bar = volumeBarRef.current;
        if (!bar || !audioRef.current) return;
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, x / rect.width));
        setVolume(percent);
        audioRef.current.volume = percent;
    };

    // Drag preciso en barra de volumen
    const handleVolumeBarMouseDown = (e) => {
        const bar = volumeBarRef.current;
        if (!bar || !audioRef.current) return;
        const move = (ev) => {
            const rect = bar.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const percent = Math.max(0, Math.min(1, x / rect.width));
            setVolume(percent);
            audioRef.current.volume = percent;
        };
        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        move(e);
    };

    const handleVolumeBarTouchStart = (e) => {
        const bar = volumeBarRef.current;
        if (!bar || !audioRef.current || !e.touches[0]) return;
        const move = (ev) => {
            if (!ev.touches[0]) return;
            const rect = bar.getBoundingClientRect();
            const x = ev.touches[0].clientX - rect.left;
            const percent = Math.max(0, Math.min(1, x / rect.width));
            setVolume(percent);
            audioRef.current.volume = percent;
        };
        const up = () => {
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', up);
        };
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', up);
        move(e);
    };

    const formatTime = (sec) => {
        if (isNaN(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Porcentaje para la barra visual
    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
    const volumePercent = volume * 100;

    // Estilos para ocultar el thumb (bola) del input range
    const hideThumb = {
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        background: 'transparent',
        width: '100%',
        height: 16,
        position: 'relative',
        zIndex: 3,
        outline: 'none',
    };

    // Extra CSS para ocultar el thumb en todos los navegadores
    const extraCss = `
        input[type="range"].no-thumb::-webkit-slider-thumb { 
            -webkit-appearance: none; 
            appearance: none; 
            width: 0; 
            height: 0; 
            background: transparent; 
            box-shadow: none;
            border: none;
        }
        input[type="range"].no-thumb::-moz-range-thumb {
            width: 0;
            height: 0;
            background: transparent;
            border: none;
        }
        input[type="range"].no-thumb::-ms-thumb {
            width: 0;
            height: 0;
            background: transparent;
            border: none;
        }
    `;

    return (
        <div className="audio-gothic-wrapper" style={{
            background: 'linear-gradient(135deg, #0a0a0f 0%, #181828 100%)',
            border: '2px solid #e94560',
            borderRadius: '16px',
            boxShadow: '0 2px 16px #000a, 0 0 12px #e9456033 inset',
            padding: '1.2rem 2rem',
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 420,
            width: '100%'
        }}>
            {/* SOLO la imagen encima del título */}
            {image && (
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: 16,
                        boxShadow: '0 2px 12px #000a, 0 0 8px #e9456033 inset'
                    }}
                />
            )}
            <style>{extraCss}</style>
            <strong>{title}</strong>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                    setPlaying(false);
                    if (typeof onEnded === 'function') onEnded();
                }}
                style={{ display: 'none' }}
            />
            {/* Nueva barra de progreso y controles */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <button
                    onClick={togglePlay}
                    style={{
                        background: 'none',
                        border: 'none',
                        marginRight: '1rem',
                        cursor: 'pointer',
                        padding: 0,
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                    }}
                    aria-label={playing ? "Pausar" : "Reproducir"}
                >
                    {playing ? (
                        // Botón de pausa
                        <svg width="38" height="38" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="15" fill="none" stroke="#e94560" strokeWidth="2"/>
                            <rect x="11" y="10" width="4" height="12" rx="1" fill="#e94560"/>
                            <rect x="17" y="10" width="4" height="12" rx="1" fill="#e94560"/>
                        </svg>
                    ) : (
                        // Botón de play
                        <svg width="38" height="38" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="15" fill="none" stroke="#e94560" strokeWidth="2"/>
                            <polygon points="13,10 24,16 13,22" fill="#e94560"/>
                        </svg>
                    )}
                </button>
                {/* Barra de progreso sin borde */}
                <div
                    ref={progressBarRef}
                    onClick={handleProgressBarClick}
                    onMouseDown={handleProgressBarMouseDown}
                    onTouchStart={handleProgressBarTouchStart}
                    style={{
                        position: 'relative',
                        flex: 1,
                        marginRight: '1rem',
                        height: 28,
                        cursor: 'pointer'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: 10,
                            background: '#23244d',
                            borderRadius: 8,
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            border: 'none' // El borde ya está eliminado
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: `${progressPercent}%`,
                            height: 10,
                            background: '#e94560',
                            borderRadius: 8,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            transition: 'width 0.1s linear',
                            border: 'none' // El borde ya está eliminado
                        }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={duration > 0 ? duration : 1}
                        step="0.01"
                        value={progress}
                        onChange={handleSeek}
                        className="no-thumb"
                        style={{ ...hideThumb, height: 28, border: 'none' }} // El borde ya está eliminado
                        tabIndex={-1}
                    />
                </div>
                <span style={{ fontFamily: "'UnifrakturCook', cursive", color: '#e94560', fontSize: '1.1rem', minWidth: 80, textAlign: 'right' }}>
                    {formatTime(progress)} / {formatTime(duration)}
                </span>
            </div>
            {/* Barra de volumen personalizada sin borde */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '0.7rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                    <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#e94560" />
                </svg>
                <div
                    ref={volumeBarRef}
                    onClick={handleVolumeBarClick}
                    onMouseDown={handleVolumeBarMouseDown}
                    onTouchStart={handleVolumeBarTouchStart}
                    style={{ position: 'relative', flex: 1, height: 16, cursor: 'pointer' }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: 4,
                            background: '#23244d',
                            borderRadius: 8,
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            border: 'none' // El borde ya está eliminado
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: `${volumePercent}%`,
                            height: 4,
                            background: '#e94560',
                            borderRadius: 8,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            transition: 'width 0.1s linear',
                            border: 'none' // El borde ya está eliminado
                        }}
                    />
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolume}
                        className="no-thumb"
                        style={{ ...hideThumb, border: 'none' }} // El borde ya está eliminado
                        tabIndex={-1}
                    />
                </div>
            </div>
        </div>
    );
};

export default GothicAudioPlayer;