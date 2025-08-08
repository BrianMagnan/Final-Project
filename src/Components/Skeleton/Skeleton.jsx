import "./Skeleton.css";

function Skeleton({ type = "default", count = 1, className = "" }) {
  const renderSkeleton = () => {
    switch (type) {
      case "album":
        return (
          <article className="music__track">
            <div className="music__artwork-container">
              <div className="music__artwork skeleton"></div>
            </div>
          </article>
        );
      case "text":
        return (
          <div className="skeleton skeleton--text">
            <div className="skeleton__line"></div>
            <div className="skeleton__line skeleton__line--short"></div>
          </div>
        );
      case "circle":
        return <div className="skeleton skeleton--circle"></div>;
      case "rectangle":
        return <div className="skeleton skeleton--rectangle"></div>;
      default:
        return <div className="skeleton skeleton--default"></div>;
    }
  };

  // For non-album types, use the count prop
  if (type !== "album") {
    return (
      <div className={`skeleton-container ${className}`}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-item">
            {renderSkeleton()}
          </div>
        ))}
      </div>
    );
  }

  // For album type, return single item (grid items are handled by parent)
  return (
    <div className={`skeleton-wrapper ${className}`}>{renderSkeleton()}</div>
  );
}

export default Skeleton;
