import { useEffect, useCallback } from "react";
import { FaSpotify, FaApple, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MusicPlayer.css";
import { usePreventScroll } from "../../hooks/useModalClose";
import { APPLE_MUSIC_ARTIST_URL } from "../../config/albums";

const formatReleaseYear = (album) => {
  if (album?.releaseDate && /^\d{4}$/.test(album.releaseDate)) {
    return album.releaseDate;
  }

  if (!album?.fullReleaseDate || album.fullReleaseDate === "unknown") {
    return null;
  }

  const date = new Date(album.fullReleaseDate);
  if (isNaN(date.getTime())) return null;
  return String(date.getFullYear());
};

const formatAlbumType = (albumType) => {
  if (!albumType) return null;
  const labels = { album: "Album", ep: "EP", single: "Single" };
  return labels[albumType] || albumType;
};

const formatDuration = (durationMs) => {
  if (!durationMs && durationMs !== 0) return null;
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function MusicPlayer({
  album,
  albums = [],
  activeIndex = null,
  onChangeIndex,
  isOpen,
  onClose,
}) {
  const canCycle = albums.length > 1 && typeof onChangeIndex === "function";
  const tracks = album?.tracks?.length ? album.tracks : [];
  const releaseYear = formatReleaseYear(album);
  const albumType = formatAlbumType(album?.albumType);
  const trackCount = tracks.length || album?.totalTracks || 0;
  const trackLabel =
    trackCount > 0
      ? `${trackCount} song${trackCount === 1 ? "" : "s"}`
      : null;
  const subtitleParts = [albumType, releaseYear, trackLabel].filter(Boolean);
  const appleUrl = album?.appleMusicUrl || APPLE_MUSIC_ARTIST_URL;

  const goPrev = useCallback(() => {
    if (!canCycle || activeIndex == null) return;
    onChangeIndex((activeIndex - 1 + albums.length) % albums.length);
  }, [activeIndex, albums.length, canCycle, onChangeIndex]);

  const goNext = useCallback(() => {
    if (!canCycle || activeIndex == null) return;
    onChangeIndex((activeIndex + 1) % albums.length);
  }, [activeIndex, albums.length, canCycle, onChangeIndex]);

  usePreventScroll(isOpen, "modal-open");

  useEffect(() => {
    if (!isOpen || !canCycle) return;

    const handleArrowKeys = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, [isOpen, canCycle, goNext, goPrev]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen || !album) return null;

  return (
    <div
      className="music-modal__overlay"
      onClick={onClose}
      style={{ "--album-art-url": `url(${album.artwork})` }}
      role="dialog"
      aria-modal="true"
      aria-label={`Listen to ${album.title}`}
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Close music player"
      >
        X
      </button>
      {canCycle && (
        <button
          type="button"
          className="music-modal__nav music-modal__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous album"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
      )}
      <div className="music-modal" onClick={(e) => e.stopPropagation()}>
        <header className="music-modal__header">
          <img
            className="music-modal__artwork"
            src={album.artwork}
            alt={`${album.title} album artwork`}
          />
          <div className="music-modal__header-info">
            <div className="music-modal__title">
              <h2 className="music-modal__title-text">{album.title}</h2>
              {subtitleParts.length > 0 && (
                <p className="music-modal__subtitle">
                  {subtitleParts.join(" · ")}
                </p>
              )}
            </div>
            <div className="music-modal__listen" aria-label="Listen options">
              <a
                className="music-modal__listen-link music-modal__listen-link--spotify"
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSpotify aria-hidden="true" />
                <span>Spotify</span>
              </a>
              <a
                className="music-modal__listen-link music-modal__listen-link--apple"
                href={appleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaApple aria-hidden="true" />
                <span>Apple Music</span>
              </a>
            </div>
          </div>
        </header>

        {tracks.length > 0 && (
          <ol className="music-modal__tracklist" aria-label="Track list">
            {tracks.map((track, index) => {
              const duration = formatDuration(track.durationMs);
              return (
                <li key={`${track.name}-${index}`} className="music-modal__track">
                  <span className="music-modal__track-number">{index + 1}</span>
                  <span className="music-modal__track-name">{track.name}</span>
                  {duration && (
                    <span className="music-modal__track-duration">{duration}</span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
      {canCycle && (
        <button
          type="button"
          className="music-modal__nav music-modal__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next album"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default MusicPlayer;
