import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = (tracks) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(tracks[currentTrackIndex]?.url));

    useEffect(() => {
        audioRef.current.src = tracks[currentTrackIndex]?.url;
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrackIndex, isPlaying, tracks]);

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const previousTrack = () => {
        setCurrentTrackIndex((prevIndex) => 
            (prevIndex - 1 + tracks.length) % tracks.length
        );
    };

    useEffect(() => {
        const handleEnded = () => {
            nextTrack();
        };

        audioRef.current.addEventListener('ended', handleEnded);
        return () => {
            audioRef.current.removeEventListener('ended', handleEnded);
        };
    }, [nextTrack]);

    return {
        isPlaying,
        play,
        pause,
        nextTrack,
        previousTrack,
        currentTrack: tracks[currentTrackIndex],
    };
};

export default useAudioPlayer;