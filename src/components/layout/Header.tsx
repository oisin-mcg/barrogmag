import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/issue", label: "Current Issue" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/archive", label: "Archive" }
];

export default function Header() {
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
          {navItems.map((item) => (
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
