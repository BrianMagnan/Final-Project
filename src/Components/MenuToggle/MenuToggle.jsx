import "./MenuToggle.css";
import CloseWhite from "../../assets/Close-Buttons/Close-White.svg";

function MenuToggle({ onOpen, isOpen, onClose }) {
  return (
    <div className="menu-toggle">
      <button
        className={`menu-toggle__button ${isOpen ? "open" : ""}`}
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <img
            src={CloseWhite}
            alt="Close menu"
            className="menu-toggle__close-button"
          />
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </button>
    </div>
  );
}

export default MenuToggle;
