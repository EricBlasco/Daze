import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed

// Function to fetch all tracks
export const fetchTracks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tracks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tracks:', error);
        throw error;
    }
};

// Function to fetch a single track by ID
export const fetchTrackById = async (trackId) => {
    try {
        const response = await axios.get(`${API_URL}/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching track with ID ${trackId}:`, error);
        throw error;
    }
};

// Function to fetch playlists
export const fetchPlaylists = async () => {
    try {
        const response = await axios.get(`${API_URL}/playlists`);
        return response.data;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

// Function to create a new playlist
export const createPlaylist = async (playlistData) => {
    try {
        const response = await axios.post(`${API_URL}/playlists`, playlistData);
        return response.data;
    } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
    }
};

// Function to upload a new track
export const uploadTrack = async (trackData) => {
    try {
        const response = await axios.post(`${API_URL}/tracks`, trackData);
        return response.data;
    } catch (error) {
        console.error('Error uploading track:', error);
        throw error;
    }
};