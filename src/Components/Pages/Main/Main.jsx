import Footer from "../../Footer/Footer";
import "./Main.css";
import SocialMedia from "../../SocialMedia/SocialMedia";
import Preloader from "../../Preloader/Preloader";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";

import { transformedAlbums } from "../../../utils/albumUtils";
import { useState, useEffect } from "react";

function Main() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading");

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage("Loading...");

      const albumsData = await transformedAlbums();
      setAlbums(albumsData);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError(err.message || "Failed to load albums");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const mostRecentAlbum = albums[0];

  // Show preloader while loading
  if (isLoading) {
    return (
      <div className="main main--loading">
        <div className="main__loading-overlay">
          <Preloader message={loadingMessage} />
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="main">
        <div className="main__header"></div>
        <div className="main__content">
          <div className="main__title">Vary Suite</div>
          <div className="main__social-media">
            <SocialMedia />
          </div>
          <ErrorDisplay error={error} onRetry={fetchAlbums} type="api" />
        </div>
        <Footer className="main__footer" />
      </div>
    );
  }

  // Show "Nothing found" message if no albums are available
  if (!albums || albums.length === 0) {
    return (
      <div className="main">
        <div className="main__header"></div>
        <div className="main__content">
          <div className="main__title">Vary Suite</div>
          <div className="main__social-media">
            <SocialMedia />
          </div>
          <div className="main__empty-message">Nothing found</div>
        </div>
        <Footer className="main__footer" />
      </div>
    );
  }

  // Show album content when data is available
  return (
    <div className="main">
      <div className="main__header"></div>
      <div className="main__content">
        <div className="main__title">Vary Suite</div>
        <div className="main__social-media">
          <SocialMedia />
        </div>

        <div className="main__most-recent-album">
          <img
            className="main__most-recent-album__artwork"
            src={mostRecentAlbum.artwork}
            alt={mostRecentAlbum.title}
            loading="lazy"
          />
        </div>
        <div className="main__most-recent-album-title">
          {mostRecentAlbum.title}
        </div>
        <div className="main__most-recent-album-release-date">Out Now</div>
        <button
          className="main__listen-button"
          onClick={() => window.open(mostRecentAlbum.spotifyUrl, "_blank")}
        >
          Listen Now
        </button>
      </div>
      <Footer className="main__footer" />
    </div>
  );
}

export default Main;
