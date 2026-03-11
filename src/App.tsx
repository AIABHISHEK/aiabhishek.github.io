import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import { projects } from "@/components/projects/projectsData";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type LocationState = {
  backgroundLocation?: Location;
};

const BASE_TITLE = "Abhishek Yadav - Backend Engineer Portfolio";

const getPageTitle = (pathname: string) => {
  if (pathname === "/") {
    return BASE_TITLE;
  }

  if (pathname === "/resume") {
    return `Resume | ${BASE_TITLE}`;
  }

  if (pathname.startsWith("/project/")) {
    const projectId = pathname.split("/project/")[1] ?? "";
    const project = projects.find((item) => item.id === projectId);
    return project ? `${project.name} | ${BASE_TITLE}` : `Project Detail | ${BASE_TITLE}`;
  }

  return `Page Not Found | ${BASE_TITLE}`;
};

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const backgroundLocation = state?.backgroundLocation;

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = pageTitle;

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") {
      return;
    }

    gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_location: window.location.href,
      page_title: pageTitle,
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Index />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail isModal />} />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
