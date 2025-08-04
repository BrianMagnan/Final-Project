import "./ErrorDisplay.css";

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
    <div className="error-display">
      <div className="error-display__container">
        <h2 className="error-display__title">{getErrorTitle()}</h2>
        <p className="error-display__message">{getErrorMessage()}</p>
        {onRetry && (
          <button
            className="error-display__retry-btn"
            onClick={onRetry}
            aria-label="Retry"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorDisplay;
