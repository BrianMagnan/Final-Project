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
        className="music-modal__overlay"
        onClick={onClose}
        style={{ "--album-art-url": `url(${album?.artwork})` }}
        role="dialog"
        aria-modal="true"
        aria-label="Music player error"
        onKeyDown={handleKeyDown}
        tabIndex="-1"
      >
        <button
          className="music-modal__close-btn"
          onClick={onClose}
          aria-label="Close music player"
        >
          X
        </button>
        <div className="music-modal" onClick={(e) => e.stopPropagation()}>
          <div className="music-modal__error">
            <h3 className="music-modal__error-title">Error</h3>
            <p className="music-modal__error-message">{error}</p>
            <button className="music-modal__error-retry" onClick={onClose}>
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
        className="music-modal__overlay"
        onClick={onClose}
        style={{ "--album-art-url": `url(${album?.artwork})` }}
        role="dialog"
        aria-modal="true"
        aria-label="Music player loading"
        onKeyDown={handleKeyDown}
        tabIndex="-1"
      >
        <button
          className="music-modal__close-btn"
          onClick={onClose}
          aria-label="Close music player"
        >
          X
        </button>
        <div className="music-modal" onClick={(e) => e.stopPropagation()}>
          <div className="music-modal__loading">
            <Preloader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="music-modal__overlay"
      onClick={onClose}
      style={{ "--album-art-url": `url(${album.artwork})` }}
      role="dialog"
      aria-modal="true"
      aria-label={`Music player for ${album.title}`}
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      <button
        className="music-modal__close-btn"
        onClick={onClose}
        aria-label="Close music player"
      >
        X
      </button>
      <div className="music-modal" onClick={(e) => e.stopPropagation()}>
        {/* Album information section */}
        <div className="music-modal__album-info">
          <img
            className="music-modal__artwork"
            src={album.artwork}
            alt={`${album.title} album artwork`}
          />
          <button
            className="music-modal__spotify-btn"
            onClick={() => window.open(album.spotifyUrl, "_blank")}
            aria-label={`Open ${album.title} in Spotify`}
          >
            Open in Spotify
          </button>
        </div>

        {/* Main content section */}
        <div className="music-modal__content">
          <div className="music-modal__title">
            <h2 className="music-modal__title-text">{album.title}</h2>
            <h3 className="music-modal__release-date">
              {formatReleaseDate(album.fullReleaseDate)}
            </h3>
          </div>
          <div className="music-modal__embed-container">
            {currentTrack && currentTrack.uri ? (
              <iframe
                className="music-modal__embed"
                src={`https://open.spotify.com/embed/track/${
                  currentTrack.uri.split(":")[2]
                }`}
                allow="encrypted-media"
                title={`Spotify player for ${currentTrack.name}`}
              />
            ) : (
              <iframe
                className="music-modal__embed"
                src={`https://open.spotify.com/embed/album/${album.id}`}
                allow="encrypted-media"
                title={`Spotify player for ${album.title}`}
              />
            )}
          </div>
          <div
            className="music-modal__track-list"
            role="listbox"
            aria-label="Track list"
          >
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`music-modal__track ${
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
                <span className="music-modal__track-number">{index + 1}</span>
                <span className="music-modal__track-title">{track.name}</span>

                <span className="music-modal__track-duration">
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
