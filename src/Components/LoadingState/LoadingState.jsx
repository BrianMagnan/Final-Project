import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Skeleton from "../Skeleton/Skeleton";
import "./LoadingState.css";

function LoadingState({ message = "Loading...", className = "" }) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSpinner) {
    return (
      <section className={`loading-state ${className}`}>
        <Preloader message={message} />
      </section>
    );
  }

  return (
    <section className={`loading-state loading-state--skeleton ${className}`}>
      <section className="loading-state__content">
        <Skeleton count={3} />
      </section>
    </section>
  );
}

export default LoadingState;
