import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Skeleton from "../Skeleton/Skeleton";
import "./LoadingState.css";

function LoadingState({
  type = "default",
  message = "Loading...",
  skeletonCount = 6,
  showSkeleton = true,
  className = "",
}) {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Show spinner for a minimum time, then show skeleton
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonContent = () => {
    switch (type) {
      case "music":
        return (
          <section className="loading-state__content">
            <section
              className="loading-state__grid"
              aria-label="Album collection skeleton"
            >
              {Array.from({ length: skeletonCount }, (_, index) => (
                <article key={index} className="skeleton__album">
                  <Skeleton key={index} type="album" />
                </article>
              ))}
            </section>
          </section>
        );
      case "main":
        return (
          <section className="loading-state__content">
            <header className="loading-state__hero">
              <Skeleton type="circle" />
              <Skeleton type="text" />
            </header>
            <section className="loading-state__section">
              <Skeleton type="rectangle" />
              <Skeleton type="text" />
            </section>
          </section>
        );
      default:
        return (
          <section className="loading-state__content">
            <Skeleton type="default" count={3} />
          </section>
        );
    }
  };

  if (showSpinner) {
    return (
      <section className={`loading-state ${className}`}>
        <Preloader message={message} />
      </section>
    );
  }

  if (!showSkeleton) {
    return (
      <section className={`loading-state ${className}`}>
        <Preloader message={message} />
      </section>
    );
  }

  return (
    <section className={`loading-state loading-state--skeleton ${className}`}>
      {renderSkeletonContent()}
    </section>
  );
}

export default LoadingState;
