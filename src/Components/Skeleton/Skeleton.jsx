import "./Skeleton.css";

function Skeleton({ type = "default", count = 1, className = "" }) {
  const renderSkeleton = () => {
    switch (type) {
      case "album":
        return (
          <article className="skeleton__album-track">
            <div className="skeleton__album-artwork-container">
              <div className="skeleton__album-artwork"></div>
            </div>
          </article>
        );
      case "text":
        return (
          <section className="skeleton skeleton--text">
            <div className="skeleton__line"></div>
            <div className="skeleton__line skeleton__line--short"></div>
          </section>
        );
      case "circle":
        return <section className="skeleton skeleton--circle"></section>;
      case "rectangle":
        return <section className="skeleton skeleton--rectangle"></section>;
      default:
        return <section className="skeleton skeleton--default"></section>;
    }
  };

  // For non-album types, use the count prop
  if (type !== "album") {
    return (
      <section className={`skeleton__container ${className}`}>
        {Array.from({ length: count }, (_, index) => (
          <article key={index} className="skeleton__item">
            {renderSkeleton()}
          </article>
        ))}
      </section>
    );
  }

  // For album type, return single item (grid items are handled by parent)
  return (
    <section className={`skeleton__wrapper ${className}`}>
      {renderSkeleton()}
    </section>
  );
}

export default Skeleton;
