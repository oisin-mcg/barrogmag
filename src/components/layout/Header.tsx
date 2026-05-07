import { NavLink } from "react-router-dom";
import { hasPublicArchiveIssues, hasPublicCurrentIssue } from "../../data/issues";

export default function Header() {
  const navItems = [
    { to: "/", label: "Home", visible: true },
    { to: "/issue", label: "Current Issue", visible: hasPublicCurrentIssue() },
    { to: "/blog", label: "Blog", visible: true },
    { to: "/about", label: "About", visible: true },
    { to: "/archive", label: "Archive", visible: hasPublicArchiveIssues() }
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          <img
            src="/assets/branding/logo-icon.png"
            alt="Barróg icon logo"
            className="brand-icon"
          />
          <img
            src="/assets/branding/logo-full.png"
            alt="Barróg Magazine"
            className="brand-full"
          />
        </NavLink>
        <nav aria-label="Main navigation" className="main-nav">
          {navItems.filter((item) => item.visible).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
