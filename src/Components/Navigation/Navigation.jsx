import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function NavBar({ navItems }) {
  const location = useLocation();

  return (
    <div>
      <div>
        <ul className="navBar__list">
          {navItems.map((item) => {
            const isActive =
              !item.isExternal && location.pathname === item.path;
            return (
              <li key={item.path}>
                {item.isExternal ? (
                  <a href={item.path} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={
                      isActive ? "navBar__link--active" : "navBar__link"
                    }
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
