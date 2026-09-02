import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";

// Lazy-load each route so the initial bundle only ships the code
// the user actually needs for the page they land on.
const StorePage = lazy(() => import("./pages/StorePage.jsx"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#101014]">
    <div className="w-8 h-8 rounded-full border-2 border-[#ff9500] border-t-transparent animate-spin" />
  </div>
);

function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/busca" element={<SearchPage />} />
        <Route path="/produto/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <AppRouter />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
