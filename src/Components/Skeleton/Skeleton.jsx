import "./Skeleton.css";

function Skeleton({ type = "default", count = 1, className = "" }) {
  const renderSkeleton = () => {
    switch (type) {
      case "album":
        return (
          <div className="skeleton skeleton--album">
            <div className="skeleton__image"></div>
            <div className="skeleton__text">
              <div className="skeleton__title"></div>
              <div className="skeleton__subtitle"></div>
            </div>
          </div>
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

  if (count > 1) {
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

  return (
    <div className={`skeleton-wrapper ${className}`}>{renderSkeleton()}</div>
  );
}

export default Skeleton;
