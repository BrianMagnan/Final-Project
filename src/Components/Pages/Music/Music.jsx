import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  getArtistAlbums,
  getAlbumTracks,
  getArtistInfo,
} from "../../../utils/spotifyApi";
import "./Music.css";
import Footer from "../../Footer/Footer";
import MusicPlayer from "../../MusicPlayer/MusicPlayer";
import { transformedAlbums } from "../../../utils/albumUtils";
import useModalClose from "../../../hooks/useModalClose";
import LoadingState from "../../LoadingState/LoadingState";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";

function Music() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading");
  const [playerError, setPlayerError] = useState(null);

  useModalClose(isPlayerOpen, () => setIsPlayerOpen(false));

  const fetchMusicData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage("Loading...");

      await Promise.all([getArtistInfo(), getArtistAlbums()]);

      const albumsData = await transformedAlbums();
      setAlbums(albumsData);
    } catch (error) {
      console.error("Error fetching music data:", error);
      setError(error.message || "Failed to load music data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  // Optimized event handler with useCallback
  const handleAlbumClick = useCallback(async (album) => {
    try {
      setPlayerError(null);
      setSelectedAlbum(album);
      setIsPlayerOpen(true);

      // Fetch tracks for this album
      const tracks = await getAlbumTracks(album.id);
      setAlbumTracks(tracks);
    } catch (error) {
      console.error("Error fetching album tracks:", error);
      setPlayerError("Failed to load album tracks. Please try again.");
      setIsPlayerOpen(false);
    }
  }, []);

  // Memoized MusicPlayer props to prevent unnecessary re-renders
  const musicPlayerProps = useMemo(
    () => ({
      album: selectedAlbum,
      tracks: albumTracks,
      isOpen: isPlayerOpen,
      onClose: () => {
        setIsPlayerOpen(false);
        setPlayerError(null);
      },
      error: playerError,
    }),
    [selectedAlbum, albumTracks, isPlayerOpen, playerError]
  );

  // Show loading state while loading
  if (isLoading) {
    return (
      <main
        className="music music--loading"
        role="main"
        aria-label="Loading music content"
      >
        <LoadingState type="music" message={loadingMessage} skeletonCount={8} />
      </main>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <main className="music" role="main" aria-label="Error page">
        <ErrorDisplay error={error} onRetry={fetchMusicData} type="api" />
        <Footer className="music__footer" />
      </main>
    );
  }

  // Show "Nothing found" message if no albums are available
  if (!albums || albums.length === 0) {
    return (
      <main className="music" role="main" aria-label="No music available">
        <div className="music__empty-message" role="status" aria-live="polite">
          Nothing found
        </div>
        <Footer className="music__footer" />
      </main>
    );
  }

  // Show music content when data is available
  return (
    <main className="music" role="main" aria-label="Music discography">
      <section className="music__grid" aria-label="Album collection">
        {albums.map((album) => (
          <article key={album.id} className="music__track">
            <div className="music__artwork-container">
              <img
                className="music__artwork"
                src={album.artwork}
                alt={`${album.title} album artwork`}
                loading="lazy"
                onClick={() => handleAlbumClick(album)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex="0"
                aria-label={`Play ${album.title} album`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleAlbumClick(album);
                  }
                }}
              />
            </div>
          </article>
        ))}
      </section>

      {createPortal(<MusicPlayer {...musicPlayerProps} />, document.body)}

      <Footer className="music__footer" />
    </main>
  );
}

export default Music;
