import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
