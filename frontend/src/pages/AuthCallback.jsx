import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = location.hash || window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const sessionId = params.get("session_id");

    if (!sessionId) {
      navigate("/auth", { replace: true });
      return;
    }

    (async () => {
      try {
        const { data } = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId },
          { withCredentials: true }
        );
        setUser(data);
        window.history.replaceState(null, "", "/");
        navigate("/", { replace: true, state: { user: data } });
      } catch (e) {
        navigate("/auth", { replace: true });
      }
    })();
  }, [location.hash, navigate, setUser]);

  return (
    <div className="min-h-screen bg-[#101014] text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#ff9500] border-t-transparent animate-spin" />
        <p className="text-sm text-[#c6c6ca]">Autenticando...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
