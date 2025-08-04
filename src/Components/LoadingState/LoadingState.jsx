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
          <div className="loading-state__content">
            <div className="loading-state__header">
              <Skeleton type="text" />
            </div>
            <div className="loading-state__grid">
              <Skeleton type="album" count={skeletonCount} />
            </div>
          </div>
        );
      case "main":
        return (
          <div className="loading-state__content">
            <div className="loading-state__hero">
              <Skeleton type="circle" />
              <Skeleton type="text" />
            </div>
            <div className="loading-state__section">
              <Skeleton type="rectangle" />
              <Skeleton type="text" />
            </div>
          </div>
        );
      default:
        return (
          <div className="loading-state__content">
            <Skeleton type="default" count={3} />
          </div>
        );
    }
  };

  if (showSpinner) {
    return (
      <div className={`loading-state ${className}`}>
        <Preloader message={message} />
      </div>
    );
  }

  if (!showSkeleton) {
    return (
      <div className={`loading-state ${className}`}>
        <Preloader message={message} />
      </div>
    );
  }

  return (
    <div className={`loading-state loading-state--skeleton ${className}`}>
      {renderSkeletonContent()}
    </div>
  );
}

export default LoadingState;
