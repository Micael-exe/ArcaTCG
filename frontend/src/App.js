import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StorePage from "./pages/StorePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import LoginRequiredModal from "./components/LoginRequiredModal.jsx";

function AppRouter() {
  const location = useLocation();
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <CartDrawer />
      <LoginRequiredModal />
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
