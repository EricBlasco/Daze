import React from 'react';

const TrackItem = ({ track, onPlay }) => {
    return (
        <div className="track-item" onClick={() => onPlay(track.id)}>
            <img src={track.albumCover} alt={`${track.title} album cover`} className="album-cover" />
            <div className="track-info">
                <h3 className="track-title">{track.title}</h3>
                <p className="track-artist">{track.artist}</p>
            </div>
        </div>
    );
};

export default TrackItem;