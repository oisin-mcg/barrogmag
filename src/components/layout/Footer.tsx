export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Barróg Digital Magazine</p>
        <p>© {year} All rights reserved.</p>
      </div>
    </footer>
  );
}
