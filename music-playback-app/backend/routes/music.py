from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
from services.playback_service import PlaybackService
import os
import shutil

router = APIRouter()
playback_service = PlaybackService()

@router.post("/upload")
async def upload_song(
    file: UploadFile = File(...),
    image: UploadFile = File(...)
):
    try:
        # Guarda la canción
        song_path = await playback_service.save_song(file)
        # Guarda la imagen
        uploads_dir = "uploads"
        os.makedirs(uploads_dir, exist_ok=True)
        image_path = os.path.join(uploads_dir, image.filename)
        with open(image_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
        # Devuelve ambas rutas relativas
        return {
            "path": song_path,
            "imagePath": f"uploads/{image.filename}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/playlists")
async def get_playlists():
    try:
        playlists = playback_service.get_playlists()
        return playlists
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/playlists/{playlist_id}")
async def edit_playlist(playlist_id: int, songs: List[int]):
    try:
        updated_playlist = playback_service.edit_playlist(playlist_id, songs)
        return updated_playlist
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playback/play")
async def play_track(track_id: int):
    try:
        playback_service.play(track_id)
        return {"message": "Playing track", "track_id": track_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playback/pause")
async def pause_track():
    try:
        playback_service.pause()
        return {"message": "Playback paused"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playback/next")
async def next_track():
    try:
        playback_service.next()
        return {"message": "Playing next track"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/playback/previous")
async def previous_track():
    try:
        playback_service.previous()
        return {"message": "Playing previous track"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))