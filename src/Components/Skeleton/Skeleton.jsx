import "./Skeleton.css";

function Skeleton({ count = 1, className = "" }) {
  return (
    <section className={`skeleton__container ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="skeleton__item">
          <section className="skeleton skeleton--default" />
        </article>
      ))}
    </section>
  );
}

export default Skeleton;
