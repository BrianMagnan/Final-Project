import "./ErrorDisplay.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

function ErrorDisplay({ error, onRetry, type }) {
  const getErrorMessage = () => {
    if (typeof error === "string") {
      return error;
    }
    if (error && error.message) {
      return error.message;
    }
    return "An unexpected error occurred";
  };

  const getErrorTitle = () => {
    switch (type) {
      case "api":
        return "API Error";
      case "component":
        return "Component Error";
      case "network":
        return "Network Error";
      default:
        return "Error";
    }
  };

  return (
    <section className="error-display">
      <article className="error-display__container">
        <h1 className="error-display__title">{getErrorTitle()}</h1>
        <h2 className="error-display__subtitle">{getErrorMessage()}</h2>

        <Link to="/" className="error-display__link">
          Go Back Home
        </Link>
      </article>
      <Footer className="error-display__footer" />
    </section>
  );
}

export default ErrorDisplay;
