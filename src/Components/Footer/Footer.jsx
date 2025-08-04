import "./Footer.css";

function Footer({ className }) {
  return (
    <footer className={`footer ${className || ""}`}>
      <div className="footer__container">
        <p>© 2025 Vary Suite. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
