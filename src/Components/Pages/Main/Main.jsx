import Footer from "../../Footer/Footer";
import "./Main.css";
import SocialMedia from "../../SocialMedia/SocialMedia";
import Preloader from "../../Preloader/Preloader";
import ErrorDisplay from "../../ErrorDisplay/ErrorDisplay";
import { useMusic } from "../../../contexts/MusicContext";

function Main() {
  const {
    albums,
    isLoading,
    error,
    loadingMessage,
    mostRecentAlbum,
    hasAlbums,
    refreshMusicData,
  } = useMusic();

  // Show preloader while loading
  if (isLoading) {
    return (
      <main className="main main--loading">
        <section className="main__loading-overlay">
          <Preloader message={loadingMessage} />
        </section>
      </main>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <main className="main">
        <section className="main__content">
          <h1 className="main__title">Vary Suite</h1>
          <aside className="main__social-media">
            <SocialMedia />
          </aside>
          <ErrorDisplay error={error} onRetry={refreshMusicData} type="api" />
        </section>
        <Footer className="--main" />
      </main>
    );
  }

  // Show "Nothing found" message if no albums are available
  if (!hasAlbums) {
    return (
      <main className="main">
        <section className="main__content">
          <h1 className="main__title">Vary Suite</h1>
          <aside className="main__social-media">
            <SocialMedia />
          </aside>
          <p className="main__empty-message">Nothing found</p>
        </section>
        <Footer className="--main" />
      </main>
    );
  }

  // Show album content when data is available
  return (
    <main className="main">
      <section className="main__content">
        <h1 className="main__title">Vary Suite</h1>
        <aside className="main__social-media">
          <SocialMedia />
        </aside>

        <article className="main__most-recent-album">
          <img
            className="main__most-recent-album-artwork"
            src={mostRecentAlbum.artwork}
            alt={`${mostRecentAlbum.title} album artwork`}
            loading="lazy"
          />
        </article>
        <h2 className="main__most-recent-album-title">
          {mostRecentAlbum.title}
        </h2>
        <p className="main__most-recent-album-release-date">Out Now</p>
        <button
          className="main__listen-button"
          onClick={() => window.open(mostRecentAlbum.spotifyUrl, "_blank")}
        >
          Listen Now
        </button>
      </section>
      <Footer className="--main" />
    </main>
  );
}

export default Main;
