import os
from fastapi import HTTPException, UploadFile

class PlaybackService:
    def __init__(self):
        self.current_track_index = 0
        self.tracks = []

    def load_tracks(self, tracks):
        self.tracks = tracks

    def play(self):
        if not self.tracks:
            raise HTTPException(status_code=404, detail="No tracks available to play.")
        return self.tracks[self.current_track_index]

    def pause(self):
        return "Playback paused."

    def next_track(self):
        if not self.tracks:
            raise HTTPException(status_code=404, detail="No tracks available.")
        self.current_track_index = (self.current_track_index + 1) % len(self.tracks)
        return self.tracks[self.current_track_index]

    def previous_track(self):
        if not self.tracks:
            raise HTTPException(status_code=404, detail="No tracks available.")
        self.current_track_index = (self.current_track_index - 1) % len(self.tracks)
        return self.tracks[self.current_track_index]

    async def save_song(self, file: UploadFile):
        uploads_dir = "uploads"
        os.makedirs(uploads_dir, exist_ok=True)
        file_location = os.path.join(uploads_dir, file.filename)
        with open(file_location, "wb") as f:
            content = await file.read()
            f.write(content)
        return f"uploads/{file.filename}"