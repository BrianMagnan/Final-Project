import { useState } from "react";
import "./SpotifyPlayer.css";

function SpotifyPlayer({ album, tracks }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div className="spotify-player">
      <div className="spotify-player__container">
        <div className="spotify-player__album-info">
          <img
            className="spotify-player__artwork"
            src={album.artwork}
            alt={`${album.title} album artwork`}
          />
          <div className="spotify-player__details">
            <h3 className="spotify-player__title">{album.title}</h3>
            <p className="spotify-player__artist">{album.artist}</p>
          </div>
        </div>

        <div className="spotify-player__embed">
          {currentTrack && currentTrack.uri ? (
            <iframe
              className="spotify-player__iframe"
              src={`https://open.spotify.com/embed/track/${
                currentTrack.uri.split(":")[2]
              }`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              title={`Spotify player for ${currentTrack.name}`}
            />
          ) : (
            <iframe
              className="spotify-player__iframe"
              src={`https://open.spotify.com/embed/album/${album.id}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              title={`Spotify player for ${album.title}`}
            />
          )}
        </div>

        <div className="spotify-player__tracks">
          {tracks.map((track, index) => (
            <button
              key={track.uri}
              className={`spotify-player__track ${
                index === currentTrackIndex
                  ? "spotify-player__track--active"
                  : ""
              }`}
              onClick={() => handleTrackClick(index)}
            >
              <span className="spotify-player__track-number">{index + 1}</span>
              <span className="spotify-player__track-name">{track.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotifyPlayer;
