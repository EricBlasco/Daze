# Music Playback App Backend

## Overview
This backend is built using FastAPI and serves as the API for the Music Playback application. It handles user authentication, music playback, and playlist management.

## Project Structure
```
backend/
├── app.py                # Entry point for the FastAPI application
├── models/               # Contains data models
│   └── user.py           # User model definition
├── routes/               # Contains API routes
│   └── music.py          # Music-related endpoints
├── services/             # Contains business logic
│   └── playback_service.py # Playback control logic
├── utils/                # Utility functions
│   └── helpers.py        # Helper functions for various tasks
├── requirements.txt      # Python dependencies
└── README.md             # Documentation for the backend
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd music-playback-app/backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```
   uvicorn app:app --reload
   ```

## API Usage
- **User Management:**
  - Register a new user
  - Login and retrieve authentication tokens

- **Music Playback:**
  - Upload songs
  - Retrieve playlists
  - Control playback (play, pause, next, previous)

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes. 

## License
This project is licensed under the MIT License.