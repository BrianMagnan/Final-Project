import "./Footer.css";

function Footer({ className }) {
  // Handle BEM modifiers properly by combining with base class
  const getFooterClass = () => {
    if (!className) return "footer";

    // If className is a modifier (starts with --), combine it with footer
    if (className.startsWith("--")) {
      return `footer ${className}`;
    }

    // If className is a full BEM class (like footer--main), use it directly
    if (className.startsWith("footer--")) {
      return className;
    }

    // Otherwise, combine base footer with the className
    return `footer ${className}`;
  };

  return (
    <footer className={getFooterClass()}>
      <div className="footer__container">
        <p>© 2025 Vary Suite. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
