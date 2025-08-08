import "./Preloader.css";

function Preloader({ message = "Loading..." }) {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__spinner"></div>
        <p className="preloader__message">{message}</p>
      </div>
    </div>
  );
}

export default Preloader;
