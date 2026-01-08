import "./MobileNav.css";
import { Link, useLocation } from "react-router-dom";
import { routes, generateNavItems } from "../../routes/routes";
import { createPortal } from "react-dom";
import SocialMedia from "../SocialMedia/SocialMedia";
import { usePreventScroll } from "../../hooks/useModalClose";

function MobileNav({ isOpen, onClose }) {
  const navItems = generateNavItems(routes);
  const location = useLocation();

  // Prevent body scrolling when mobile nav is open
  usePreventScroll(isOpen, "menu-open");

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
                        className="mobile-nav__link-element"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={
                          isActive
                            ? "mobile-nav__link-element--active"
                            : "mobile-nav__link-element"
                        }
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
            <div className="mobile-nav__social-link">
              <SocialMedia />
            </div>
          </div>
        </div>,
        document.getElementById("nav-portal")
      )}
    </>
  );
}
export default MobileNav;
