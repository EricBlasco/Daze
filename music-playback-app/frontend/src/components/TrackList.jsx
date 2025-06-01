import React from 'react';
import TrackItem from './TrackItem';

const TrackList = ({ tracks }) => {
    return (
        <div className="track-list">
            {tracks.length > 0 ? (
                tracks.map(track => (
                    <TrackItem key={track.id} track={track} />
                ))
            ) : (
                <p>No tracks available</p>
            )}
        </div>
    );
};

export default TrackList;