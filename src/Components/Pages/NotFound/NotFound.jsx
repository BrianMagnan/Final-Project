import { Link } from "react-router-dom";
import "./NotFound.css";
import Footer from "../../Footer/Footer";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Page Not Found</h2>
        <p className="not-found__message">
          We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
          exist.
        </p>
        <Link to="/" className="not-found__link">
          Go Back Home
        </Link>
      </div>
      <Footer className="not-found__footer" />
    </div>
  );
}

export default NotFound;
