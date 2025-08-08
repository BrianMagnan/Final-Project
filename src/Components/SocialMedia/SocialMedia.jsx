import "./SocialMedia.css";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

function SocialMedia() {
  const socialLinks = [
    {
      name: "Youtube",
      url: "https://www.youtube.com/@VarySuite",
      icon: <FaYoutube />,
    },

    {
      name: "Instagram",
      url: "https://instagram.com/varysuite",
      icon: <FaInstagram />,
    },
    {
      name: "Blue Sky",
      url: "https://bsky.app/profile/varysuite.bsky.social",

      icon: <FaBluesky />,
    },

    {
      name: "TikTok",
      url: "https://www.tiktok.com/@varysuite",
      icon: <FaTiktok />,
    },
  ];

  return (
    <div className="social-media">
      <div className="social-media__container">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-media__link social-media__link--${link.name.toLowerCase()}`}
            aria-label={`Visit my ${link.name} profile`}
          >
            {link.icon}
            <span className="social-media__tooltip">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialMedia;
