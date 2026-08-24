import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import LoginRequiredModal from "./components/LoginRequiredModal.jsx";
import CheckoutSuccessModal from "./components/CheckoutSuccessModal.jsx";

// Lazy-load each route so the initial bundle only ships the code
// the user actually needs for the page they land on.
const StorePage = lazy(() => import("./pages/StorePage.jsx"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const AuthCallback = lazy(() => import("./pages/AuthCallback.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#101014]">
    <div className="w-8 h-8 rounded-full border-2 border-[#ff9500] border-t-transparent animate-spin" />
  </div>
);

function GlobalModals() {
  const { successOrder, setSuccessOrder } = useCart();
  return (
    <>
      <CartDrawer />
      <LoginRequiredModal />
      <CheckoutSuccessModal
        open={!!successOrder}
        order={successOrder}
        onClose={() => setSuccessOrder(null)}
      />
    </>
  );
}

function AppRouter() {
  const location = useLocation();
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  if (location.hash?.includes("session_id=")) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AuthCallback />
      </Suspense>
    );
  }
  return (
    <>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <GlobalModals />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
