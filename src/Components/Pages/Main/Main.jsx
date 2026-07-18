import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSpotify, FaHeadphones, FaApple, FaPlay } from "react-icons/fa";
import Footer from "../../Footer/Footer";
import SocialMedia from "../../SocialMedia/SocialMedia";
import VideoGrid from "../../VideoGrid/VideoGrid";
import logo from "../../../assets/Vary-Suite-Logo.svg";
import {
  FEATURED_VIDEO,
  youtubeEmbedUrl,
  youtubeThumbUrl,
} from "../../../config/videos";
import "./Main.css";

const SPOTIFY_URL =
  "https://open.spotify.com/artist/7HEEDYRvzftd8oSQLxVBj0";
const APPLE_MUSIC_URL =
  "https://music.apple.com/us/artist/vary-suite/1439823793";

function Main() {
  const featured = FEATURED_VIDEO;
  const [isFeaturedPlaying, setIsFeaturedPlaying] = useState(false);

  return (
    <main className="main">
      <section className="main__content" aria-label="Vary Suite home">
        <img
          className="main__avatar"
          src={logo}
          alt=""
          width={120}
          height={105}
        />
        <h1 className="main__title page-title">Vary Suite</h1>
        <p className="main__tagline page-subtitle">Music by Brian Magnan</p>

        {featured && (
          <div className="main__featured">
            <h2 className="main__featured-eyebrow section-title">Featured</h2>
            <div className="main__featured-player">
              <div className="main__featured-media">
                {isFeaturedPlaying ? (
                  <iframe
                    className="main__featured-embed"
                    src={youtubeEmbedUrl(featured.id)}
                    title={featured.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="main__featured-play-btn"
                    onClick={() => setIsFeaturedPlaying(true)}
                    aria-label={`Play ${featured.title}`}
                  >
                    <img
                      className="main__featured-art"
                      src={youtubeThumbUrl(featured.id)}
                      alt=""
                      width={480}
                      height={360}
                      loading="eager"
                    />
                    <span className="main__featured-play" aria-hidden="true">
                      <FaPlay />
                    </span>
                  </button>
                )}
              </div>
              <p className="main__featured-title content-title">
                {featured.title}
              </p>
              {featured.subtitle && (
                <p className="main__featured-subtitle content-subtitle">
                  {featured.subtitle}
                </p>
              )}
            </div>
            <div className="main__featured-stream">
              <a
                className="main__featured-stream-link"
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on Spotify"
              >
                <FaSpotify aria-hidden="true" />
              </a>
              <a
                className="main__featured-stream-link"
                href={APPLE_MUSIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on Apple Music"
              >
                <FaApple aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        <section className="main__videos" aria-label="More videos">
          <VideoGrid heading="More Videos" />
        </section>

        <section className="main__listen" aria-label="More music">
          <Link className="hub-link" to="/music">
            <span className="hub-link__icon">
              <FaHeadphones aria-hidden="true" />
            </span>
            <span className="hub-link__label">More Music</span>
          </Link>
        </section>

        <aside className="main__social-media">
          <SocialMedia />
        </aside>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
