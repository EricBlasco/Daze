# Music Playback App - Frontend

This is the frontend part of the Music Playback App, built using React. It provides a user interface for music playback, allowing users to browse tracks, control playback, and manage playlists.

## Getting Started

To get started with the frontend, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd music-playback-app/frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then, run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server with:
   ```bash
   npm start
   ```
   This will open the application in your default web browser at `http://localhost:3000`.

## Project Structure

- **public/**: Contains the static files, including the main HTML file.
- **src/**: Contains the source code for the React application.
  - **components/**: Contains reusable components such as Player, TrackList, TrackItem, and Navbar.
  - **hooks/**: Contains custom hooks like `useAudioPlayer` for managing audio playback.
  - **services/**: Contains API service functions for making requests to the backend.

## Components Overview

- **Player.jsx**: The audio player component that includes controls for play, pause, next, and previous tracks.
- **TrackList.jsx**: Displays a list of available tracks for playback.
- **TrackItem.jsx**: Represents an individual track, showing the album cover and title.
- **Navbar.jsx**: Provides navigation links for the user.

## Custom Hooks

- **useAudioPlayer.js**: A custom hook that manages the audio playback state, including play, pause, and track switching functionalities.

## API Integration

The frontend communicates with the backend API to fetch songs, playlists, and user data. Ensure that the backend is running and accessible for the frontend to function correctly.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.