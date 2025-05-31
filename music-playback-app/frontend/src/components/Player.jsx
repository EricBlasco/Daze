import React, { useState, useEffect } from 'react';
import useAudioPlayer from '../hooks/useAudioPlayer';

const Player = ({ track, onNext, onPrevious }) => {
    const { play, pause, isPlaying, currentTime, duration, setCurrentTime } = useAudioPlayer(track);

    const handleTimeChange = (e) => {
        setCurrentTime(e.target.value);
    };

    useEffect(() => {
        if (track) {
            setCurrentTime(0); // Reset time when track changes
        }
    }, [track, setCurrentTime]);

    return (
        <div className="player">
            <h2>{track ? track.title : 'Select a track'}</h2>
            <audio src={track ? track.audioUrl : ''} />
            <div className="controls">
                <button onClick={onPrevious} disabled={!track}>Previous</button>
                {isPlaying ? (
                    <button onClick={pause}>Pause</button>
                ) : (
                    <button onClick={play}>Play</button>
                )}
                <button onClick={onNext} disabled={!track}>Next</button>
            </div>
            <div className="progress">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleTimeChange}
                />
                <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
            </div>
        </div>
    );
};

export default Player;