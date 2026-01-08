import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function NavBar({ navItems }) {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item) => {
          const isActive = !item.isExternal && location.pathname === item.path;
          return (
            <li key={item.path}>
              {item.isExternal ? (
                <a href={item.path} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={isActive ? "nav__link--active" : "nav__link"}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
