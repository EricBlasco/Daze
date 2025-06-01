from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.music import router as music_router
from fastapi import APIRouter, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Middleware to allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include music routes with prefix
app.include_router(music_router, prefix="/api")

router = APIRouter()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search"

@router.get("/search")
async def search_songs(query: str):
    try:
        response = requests.get(YOUTUBE_API_URL, params={
            "part": "snippet",
            "q": query,
            "type": "video",
            "videoCategoryId": "10",  # Categoría de música
            "key": YOUTUBE_API_KEY,
            "maxResults": 10
        })
        response.raise_for_status()
        data = response.json()

        tracks = [
            {
                "id": item["id"]["videoId"],
                "title": item["snippet"]["title"],
                "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                "channel": item["snippet"]["channelTitle"],
                "description": item["snippet"]["description"],
            }
            for item in data.get("items", [])
        ]

        return {"tracks": tracks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router for YouTube search
app.include_router(router, prefix="/api")