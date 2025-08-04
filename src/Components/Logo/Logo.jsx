import { Link } from "react-router-dom";
import "./Logo.css";

function Logo({ onClose }) {
  return (
    <Link to="/" onClick={onClose}>
      <img className="logo" src="src/assets/Vary-Suite-Logo.svg" alt="logo" />
    </Link>
  );
}

export default Logo;
