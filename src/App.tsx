import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import AboutPage from "./pages/AboutPage";
import ArchivePage from "./pages/ArchivePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CurrentIssuePage from "./pages/CurrentIssuePage";
import HomePage from "./pages/HomePage";

function AdminFallback() {
  useEffect(() => {
    if (window.location.pathname !== "/admin/index.html") {
      window.location.replace(
        `/admin/index.html${window.location.search}${window.location.hash}`
      );
    }
  }, []);

  return null;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/issue/:slug?" element={<CurrentIssuePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
      <Route path="/admin/*" element={<AdminFallback />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
