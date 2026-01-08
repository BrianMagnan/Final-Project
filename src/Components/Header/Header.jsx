import { useState } from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import MenuToggle from "../MenuToggle/MenuToggle";
import MobileNav from "../MobileNav/MobileNav";
import Navigation from "../Navigation/Navigation";
import { generateNavItems } from "../../routes/routes";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navItems = generateNavItems();

  return (
    <header className={`header ${isMenuOpen ? "header--fixed" : ""}`}>
      <div className="header__logo">
        <Logo onClose={handleMenuClose} isOpen={isMenuOpen} />
      </div>
      <div className="header__navigation">
        <Navigation navItems={navItems} />
      </div>
      <MenuToggle
        onOpen={handleMenuToggle}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />
      <MobileNav isOpen={isMenuOpen} onClose={handleMenuClose} />
    </header>
  );
}

export default Header;
