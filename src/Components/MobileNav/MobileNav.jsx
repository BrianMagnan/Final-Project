import "./MobileNav.css";
import { Link, useLocation } from "react-router-dom";
import { routes, generateNavItems } from "../../routes/routes";
import { createPortal } from "react-dom";
import SocialMedia from "../SocialMedia/SocialMedia";

function MobileNav({ isOpen, onClose }) {
  const navItems = generateNavItems(routes);
  const location = useLocation();

  return (
    <>
      {createPortal(
        <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
          <ul className="mobile-nav__menu">
            <li className="mobile-nav__links">
              {navItems.map((item) => {
                const isActive =
                  !item.isExternal && location.pathname === item.path;
                return (
                  <div key={item.path} className="mobile-nav__link">
                    {item.isExternal ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={isActive ? "mobile-nav__link--active" : ""}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </li>
          </ul>
          <div className="mobile-nav__social">
            <SocialMedia />
          </div>
        </div>,
        document.getElementById("nav-portal")
      )}
    </>
  );
}
export default MobileNav;
