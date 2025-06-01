# Music Playback Application

This project is a music playback web application that allows users to listen to tracks, manage playlists, and control playback. It is built using FastAPI for the backend and React for the frontend.

## Project Structure

```
music-playback-app
├── backend
│   ├── app.py                # Entry point for the FastAPI application
│   ├── models                # Contains data models
│   │   └── user.py           # User model and authentication
│   ├── routes                # RESTful API routes
│   │   └── music.py          # Endpoints for music and playlists
│   ├── services              # Business logic
│   │   └── playback_service.py # Playback control logic
│   ├── utils                 # Utility functions
│   │   └── helpers.py        # Common helper functions
│   ├── requirements.txt      # Python dependencies
│   └── README.md             # Backend documentation
├── frontend
│   ├── public
│   │   └── index.html        # Main HTML file for React app
│   ├── src
│   │   ├── App.jsx           # Main React component
│   │   ├── index.js          # Entry point for React app
│   │   ├── components        # React components
│   │   │   ├── Player.jsx    # Audio player component
│   │   │   ├── TrackList.jsx  # List of tracks
│   │   │   ├── TrackItem.jsx  # Individual track item
│   │   │   └── Navbar.jsx     # Navigation bar
│   │   ├── hooks             # Custom hooks
│   │   │   └── useAudioPlayer.js # Hook for audio playback
│   │   └── services          # API service functions
│   │       └── api.js        # Functions for API calls
│   ├── package.json          # npm configuration
│   └── README.md             # Frontend documentation
└── README.md                 # Overall project documentation
```

## Getting Started

### Prerequisites

- Python 3.7 or higher
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

3. Run the FastAPI application:
   ```
   uvicorn app:app --reload
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

## Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API can be accessed at `http://localhost:8000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.