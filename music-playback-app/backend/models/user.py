from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

    # You can add relationships to other models here if needed
    # playlists = relationship("Playlist", back_populates="owner")

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"