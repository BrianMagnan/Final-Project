import { useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import "./Music.css";
import Footer from "../../Footer/Footer";
import MusicPlayer from "../../MusicPlayer/MusicPlayer";
import useModalClose from "../../../hooks/useModalClose";
import { FEATURED_ALBUMS } from "../../../config/albums";

function Music() {
  const albums = FEATURED_ALBUMS;
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const closePlayer = useCallback(() => {
    setIsPlayerOpen(false);
    setActiveIndex(null);
  }, []);

  useModalClose(isPlayerOpen, closePlayer);

  const handleAlbumClick = useCallback((index) => {
    setActiveIndex(index);
    setIsPlayerOpen(true);
  }, []);

  const selectedAlbum =
    activeIndex != null && albums[activeIndex] ? albums[activeIndex] : null;

  const musicPlayerProps = useMemo(
    () => ({
      album: selectedAlbum,
      albums,
      activeIndex,
      onChangeIndex: setActiveIndex,
      isOpen: isPlayerOpen,
      onClose: closePlayer,
    }),
    [selectedAlbum, albums, activeIndex, isPlayerOpen, closePlayer]
  );

  return (
    <main className="music" role="main" aria-label="Music discography">
      <header className="music__header">
        <h1 className="music__title page-title">Music</h1>
        <p className="music__subtitle page-subtitle">Albums & singles</p>
      </header>
      <section className="music__grid" aria-label="Album collection">
        {albums.map((album, index) => (
          <article key={album.id} className="music__track">
            <div className="music__artwork-container">
              <img
                className="music__artwork"
                src={album.artwork}
                alt={`${album.title} album artwork`}
                loading="lazy"
                onClick={() => handleAlbumClick(index)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex="0"
                aria-label={`Play ${album.title} album`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAlbumClick(index);
                  }
                }}
              />
            </div>
          </article>
        ))}
      </section>

      {createPortal(<MusicPlayer {...musicPlayerProps} />, document.body)}

      <Footer className="--music" />
    </main>
  );
}

export default Music;
