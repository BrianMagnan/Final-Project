import "./StreamingLinks.css";
import { FaSpotify, FaApple, FaAmazon, FaYoutube } from "react-icons/fa";

function Streaming() {
  const streamingLinks = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/74016110000000000000000000000000",
      icon: <FaSpotify />,
      cssClass: "streaming__link--spotify",
    },

    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/vary-suite/17401611000000000000000000000000",
      icon: <FaApple />,
      cssClass: "streaming__link--apple-music",
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/B00000000000000000000000000000000",
      icon: <FaAmazon />,
      cssClass: "streaming__link--amazon-music",
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/artist/UC-9-kyTWxE2xvmDiTxJAJ2w",
      icon: <FaYoutube />,
      cssClass: "streaming__link--youtube-music",
    },
  ];

  return (
    <div className="streaming">
      <div className="streaming__container">
        {streamingLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`streaming__link ${link.cssClass}`}
            aria-label={`Visit my ${link.name} profile`}
          >
            {link.icon}
            <span className="streaming__tooltip">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Streaming;
