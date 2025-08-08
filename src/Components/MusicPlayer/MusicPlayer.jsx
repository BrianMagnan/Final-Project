import { useState, useEffect } from "react";
import "./MusicPlayer.css";
import { usePreventScroll } from "../../hooks/useModalClose";
import Preloader from "../Preloader/Preloader";

// Helper function to format duration from milliseconds to MM:SS
const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Helper function to format release date
const formatReleaseDate = (dateString) => {
  if (!dateString || dateString === "unknown") return "Unknown";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}.${year.toString().slice(-2)}`;
};

function MusicPlayer({ album, tracks, isOpen, onClose, error }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentTrack = tracks?.[currentTrackIndex];

  usePreventScroll(isOpen, "modal-open");

  // Set loading to false after a short delay to allow content to load
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTrackClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Show error state if there's an error
  if (error) {
    return (
      <div
        className="musicModal-overlay"
        onClick={onClose}
        style={{ "--album-art-url": `url(${album?.artwork})` }}
        role="dialog"
        aria-modal="true"
        aria-label="Music player error"
        onKeyDown={handleKeyDown}
        tabIndex="-1"
      >
        <button
          className="musicModal__close-btn"
          onClick={onClose}
          aria-label="Close music player"
        >
          X
        </button>
        <div className="musicModal" onClick={(e) => e.stopPropagation()}>
          <div className="musicModal__error">
            <h3 className="musicModal__error-title">Error</h3>
            <p className="musicModal__error-message">{error}</p>
            <button className="musicModal__error-retry" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="musicModal-overlay"
        onClick={onClose}
        style={{ "--album-art-url": `url(${album?.artwork})` }}
        role="dialog"
        aria-modal="true"
        aria-label="Music player loading"
        onKeyDown={handleKeyDown}
        tabIndex="-1"
      >
        <button
          className="musicModal__close-btn"
          onClick={onClose}
          aria-label="Close music player"
        >
          X
        </button>
        <div className="musicModal" onClick={(e) => e.stopPropagation()}>
          <div className="musicModal__loading">
            <Preloader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="musicModal-overlay"
      onClick={onClose}
      style={{ "--album-art-url": `url(${album.artwork})` }}
      role="dialog"
      aria-modal="true"
      aria-label={`Music player for ${album.title}`}
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      <button
        className="musicModal__close-btn"
        onClick={onClose}
        aria-label="Close music player"
      >
        X
      </button>
      <div className="musicModal" onClick={(e) => e.stopPropagation()}>
        {/* Left side of the modal */}
        <div className="musicModal__left">
          <img
            className="musicModal__artwork"
            src={album.artwork}
            alt={`${album.title} album artwork`}
          />
          <button
            className="musicModal__spotify-btn"
            onClick={() => window.open(album.spotifyUrl, "_blank")}
            aria-label={`Open ${album.title} in Spotify`}
          >
            Open in Spotify
          </button>
        </div>

        {/* Right side of the modal */}
        <div className="musicModal__right">
          <div className="musicModal__title">
            <h2 className="musicModal__title-text">{album.title}</h2>
            <h3 className="musicModal__release-date">
              {formatReleaseDate(album.fullReleaseDate)}
            </h3>
          </div>
          <div className="musicModal__embed-container">
            {currentTrack && currentTrack.uri ? (
              <iframe
                className="musicModal__embed"
                src={`https://open.spotify.com/embed/track/${
                  currentTrack.uri.split(":")[2]
                }`}
                allow="encrypted-media"
                title={`Spotify player for ${currentTrack.name}`}
              />
            ) : (
              <iframe
                className="musicModal__embed"
                src={`https://open.spotify.com/embed/album/${album.id}`}
                allow="encrypted-media"
                title={`Spotify player for ${album.title}`}
              />
            )}
          </div>
          <div
            className="musicModal__track-list"
            role="listbox"
            aria-label="Track list"
          >
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`musicModal__track ${
                  index === currentTrackIndex ? "active" : ""
                }`}
                onClick={() => handleTrackClick(index)}
                role="option"
                aria-selected={index === currentTrackIndex}
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTrackClick(index);
                  }
                }}
              >
                <span className="musicModal__track-number">{index + 1}</span>
                <span className="musicModal__track-title">{track.name}</span>

                <span className="musicModal__track-duration">
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
