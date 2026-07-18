import Footer from "../../Footer/Footer";
import VideoGrid from "../../VideoGrid/VideoGrid";
import "./Videos.css";

function Videos() {
  return (
    <main className="videos">
      <section className="videos__content">
        <header className="videos__header">
          <h1 className="videos__title page-title">Videos</h1>
          <p className="videos__subtitle page-subtitle">Latest from YouTube</p>
        </header>

        <VideoGrid showHeading={false} showChannelLink />
      </section>

      <Footer />
    </main>
  );
}

export default Videos;
