import "./ErrorDisplay.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

function ErrorDisplay({ error }) {
  const message =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred";

  return (
    <section className="error-display">
      <article className="error-display__container">
        <h1 className="error-display__title">Something went wrong</h1>
        <h2 className="error-display__subtitle">{message}</h2>

        <Link to="/" className="error-display__link">
          Go Back Home
        </Link>
      </article>
      <Footer className="error-display__footer" />
    </section>
  );
}

export default ErrorDisplay;
