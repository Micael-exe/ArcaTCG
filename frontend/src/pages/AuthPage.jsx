import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LOGO_URL = "https://customer-assets-lqy194kg.emergentagent.net/job_digital-shop-430/artifacts/0vc1ra97_ArcaLOGO.jpeg";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8e]" />
    <input
      {...props}
      className="w-full bg-[#1a1a1e] rounded-md pl-10 pr-3 py-3 text-sm text-white placeholder:text-[#8a8a8e] border border-[#26262a] focus:outline-none focus:border-[#ff9500] transition-colors"
    />
  </div>
);

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8a8e]" />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#1a1a1e] rounded-md pl-10 pr-10 py-3 text-sm text-white placeholder:text-[#8a8a8e] border border-[#26262a] focus:outline-none focus:border-[#ff9500] transition-colors"
      />
      <button type="button" onClick={() => setShow(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8e] hover:text-white">
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
};

const googleLogin = () => {
  // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const redirectUrl = window.location.origin + "/";
  window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loginErr, setLoginErr] = useState("");
  const [regErr, setRegErr] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/";

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoginErr("");
    if (!loginData.email || !loginData.password) { setLoginErr("Preencha todos os campos"); return; }
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setLoginErr(err.response?.data?.detail || "Falha ao entrar");
    } finally { setLoading(false); }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setRegErr("");
    if (!regData.name || !regData.email || !regData.password) { setRegErr("Preencha todos os campos"); return; }
    if (regData.password.length < 6) { setRegErr("Senha precisa ter pelo menos 6 caracteres"); return; }
    if (regData.password !== regData.confirm) { setRegErr("As senhas não coincidem"); return; }
    setLoading(true);
    try {
      await register(regData.name, regData.email, regData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setRegErr(err.response?.data?.detail || "Falha ao cadastrar");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#101014] text-white">
      <div className="px-4 lg:px-10 py-4 border-b border-[#1a1a1e] flex items-center gap-3">
        <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full hover:bg-[#1a1a1e] flex items-center justify-center transition-colors" aria-label="voltar">
          <ArrowLeft className="w-5 h-5 text-[#c6c6ca]" />
        </button>
        <a href="/" className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="ArcaTCG" className="w-9 h-9 rounded-full object-cover ring-1 ring-[#26262a]" />
          <span className="text-white font-extrabold tracking-tight text-[16px]">Arca<span className="text-[#ff9500]">TCG</span></span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* LOGIN */}
          <div className="bg-[#141418] rounded-2xl p-6 lg:p-8 border border-[#1f1f24]">
            <h1 className="text-2xl font-extrabold tracking-tight mb-1">Entrar</h1>
            <p className="text-[13px] text-[#8a8a8e] mb-6">Acesse sua conta para continuar comprando</p>

            <form onSubmit={submitLogin} className="space-y-3">
              <Input icon={Mail} type="email" placeholder="E-mail" value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
              <PasswordInput value={loginData.password} placeholder="Senha"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

              <div className="flex justify-end">
                <button type="button" className="text-[12px] text-[#c6c6ca] hover:text-[#ff9500] transition-colors">
                  Esqueci minha senha
                </button>
              </div>

              {loginErr && <div className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">{loginErr}</div>}

              <button type="submit" disabled={loading}
                className="w-full bg-[#ff9500] hover:bg-[#ffab33] disabled:opacity-60 text-[#101014] font-semibold py-3 rounded-md transition-colors">
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#26262a]" />
              <span className="text-[11px] text-[#8a8a8e] uppercase tracking-widest">ou</span>
              <div className="flex-1 h-px bg-[#26262a]" />
            </div>

            <button onClick={googleLogin}
              className="w-full bg-white hover:bg-[#e5e5e5] text-[#101014] font-medium py-3 rounded-md flex items-center justify-center gap-3 transition-colors">
              <GoogleIcon />
              <span>Entrar com Google</span>
            </button>
          </div>

          {/* REGISTER */}
          <div className="bg-[#141418] rounded-2xl p-6 lg:p-8 border border-[#1f1f24]">
            <h1 className="text-2xl font-extrabold tracking-tight mb-1">Criar conta</h1>
            <p className="text-[13px] text-[#8a8a8e] mb-6">Cadastre-se e comece sua coleção</p>

            <form onSubmit={submitRegister} className="space-y-3">
              <Input icon={UserIcon} type="text" placeholder="Nome completo" value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })} />
              <Input icon={Mail} type="email" placeholder="E-mail" value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })} />
              <PasswordInput value={regData.password} placeholder="Senha (mín. 6 caracteres)"
                onChange={(e) => setRegData({ ...regData, password: e.target.value })} />
              <PasswordInput value={regData.confirm} placeholder="Confirme a senha"
                onChange={(e) => setRegData({ ...regData, confirm: e.target.value })} />

              {regErr && <div className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">{regErr}</div>}

              <button type="submit" disabled={loading}
                className="w-full bg-[#ff9500] hover:bg-[#ffab33] disabled:opacity-60 text-[#101014] font-semibold py-3 rounded-md transition-colors">
                {loading ? "Criando..." : "Criar conta"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#26262a]" />
              <span className="text-[11px] text-[#8a8a8e] uppercase tracking-widest">ou</span>
              <div className="flex-1 h-px bg-[#26262a]" />
            </div>

            <button onClick={googleLogin}
              className="w-full bg-white hover:bg-[#e5e5e5] text-[#101014] font-medium py-3 rounded-md flex items-center justify-center gap-3 transition-colors">
              <GoogleIcon />
              <span>Cadastrar com Google</span>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#8a8a8e] mt-8 max-w-lg mx-auto">
          Ao continuar você concorda com nossos Termos de Uso e Política de Privacidade da ArcaTCG.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
