import "./Maintenance.css";
import Footer from "../../Footer/Footer";

function Maintenance() {
  return (
    <main className="maintenance">
      <section className="maintenance__content">
        <div className="maintenance__icon" aria-hidden="true">
          ✦
        </div>
        <h1 className="maintenance__title">Vary Suite</h1>
        <h2 className="maintenance__subtitle">Under Construction</h2>
        <p className="maintenance__message">
          We&apos;re making some improvements. Check back soon.
        </p>
        <div className="maintenance__spinner" aria-hidden="true" />
      </section>
      <Footer className="maintenance__footer" />
    </main>
  );
}

export default Maintenance;
