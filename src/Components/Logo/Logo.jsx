import { Link } from "react-router-dom";
import logo from "../../assets/Vary-Suite-Logo.svg";
import "./Logo.css";

function Logo({ onClose }) {
  return (
    <Link to="/" onClick={onClose}>
      <img className="logo" src={logo} alt="logo" />
    </Link>
  );
}

export default Logo;
