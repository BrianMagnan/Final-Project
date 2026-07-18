import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaPlay, FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useModalClose from "../../hooks/useModalClose";
import {
  FEATURED_VIDEOS,
  youtubeEmbedUrl,
  youtubeThumbUrl,
} from "../../config/videos";
import "../Pages/Videos/Videos.css";

const SWIPE_THRESHOLD_PX = 50;

function VideoModal({ videos, activeIndex, onClose, onChangeIndex }) {
  const video = activeIndex != null ? videos[activeIndex] : null;
  const canCycle = videos.length > 1;
  const touchStartRef = useRef(null);
  const didSwipeRef = useRef(false);

  const goPrev = useCallback(() => {
    if (!canCycle) return;
    onChangeIndex((activeIndex - 1 + videos.length) % videos.length);
  }, [activeIndex, canCycle, onChangeIndex, videos.length]);

  const goNext = useCallback(() => {
    if (!canCycle) return;
    onChangeIndex((activeIndex + 1) % videos.length);
  }, [activeIndex, canCycle, onChangeIndex, videos.length]);

  const handleTouchStart = useCallback((event) => {
    if (!canCycle) return;
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    didSwipeRef.current = false;
  }, [canCycle]);

  const handleTouchEnd = useCallback(
    (event) => {
      if (!canCycle || !touchStartRef.current) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) {
        return;
      }

      didSwipeRef.current = true;
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    },
    [canCycle, goNext, goPrev]
  );

  const handleOverlayClick = useCallback(() => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (activeIndex == null) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goNext, goPrev]);

  if (!video) return null;

  return createPortal(
    <div
      className="videos__modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={handleOverlayClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ "--video-thumb-url": `url(${youtubeThumbUrl(video.id)})` }}
    >
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Close video"
      >
        X
      </button>
      {canCycle && (
        <button
          type="button"
          className="videos__modal-nav videos__modal-nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous video"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
      )}
      <div
        className="videos__modal"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="videos__modal-player">
          <iframe
            key={video.id}
            src={youtubeEmbedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          {canCycle && (
            <>
              <div
                className="videos__modal-swipe-edge videos__modal-swipe-edge--prev"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                aria-hidden="true"
              />
              <div
                className="videos__modal-swipe-edge videos__modal-swipe-edge--next"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                aria-hidden="true"
              />
            </>
          )}
        </div>
        <div className="videos__modal-meta">
          <p className="videos__modal-title content-title">{video.title}</p>
          {canCycle && (
            <p className="videos__modal-count content-subtitle">
              {activeIndex + 1} / {videos.length}
            </p>
          )}
        </div>
      </div>
      {canCycle && (
        <button
          type="button"
          className="videos__modal-nav videos__modal-nav--next"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next video"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body
  );
}

function VideoGrid({
  videos = FEATURED_VIDEOS,
  showChannelLink = false,
  heading = "Videos",
  showHeading = true,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeModal = useCallback(() => setActiveIndex(null), []);
  useModalClose(activeIndex != null, closeModal);

  return (
    <div className="video-grid">
      {showHeading && (
        <header className="video-grid__header">
          <h2 className="video-grid__title section-title">{heading}</h2>
        </header>
      )}

      <ul className="videos__grid" aria-label="YouTube videos">
        {videos.map((video, index) => (
          <li key={video.id} className="videos__item">
            <button
              type="button"
              className="videos__card"
              onClick={() => setActiveIndex(index)}
              aria-label={`Play ${video.title}`}
            >
              <span className="videos__thumb-wrap">
                <img
                  className="videos__thumb"
                  src={youtubeThumbUrl(video.id)}
                  alt=""
                  loading="lazy"
                  width={480}
                  height={360}
                />
                <span className="videos__play" aria-hidden="true">
                  <FaPlay />
                </span>
              </span>
              <span className="videos__card-title card-title">{video.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {showChannelLink && (
        <a
          className="hub-link videos__hub-link"
          href="https://www.youtube.com/@VarySuite"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="hub-link__icon">
            <FaYoutube aria-hidden="true" />
          </span>
          <span className="hub-link__label">Watch more on YouTube</span>
        </a>
      )}

      <VideoModal
        videos={videos}
        activeIndex={activeIndex}
        onClose={closeModal}
        onChangeIndex={setActiveIndex}
      />
    </div>
  );
}

export default VideoGrid;
