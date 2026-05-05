import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Wrench, Lock, Mail, Eye, EyeOff, ShieldCheck,
  ArrowRight, AlertCircle, ArrowLeft, CheckCircle2, KeyRound, RefreshCw,
} from "lucide-react";

type Screen = "login" | "forgot" | "otp" | "reset" | "done";

export function AdminLogin() {
  const navigate = useNavigate();

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<"idle" | "loading" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  // Forgot password flow
  const [screen, setScreen] = useState<Screen>("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotEmailValid, setForgotEmailValid] = useState<boolean | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [forgotLoading, setForgotLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { if (screen === "login") emailRef.current?.focus(); }, [screen]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((r) => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const validateEmail = (v: string) => setEmailValid(v.length > 3 && v.includes("@") && v.includes("."));
  const validateForgotEmail = (v: string) => setForgotEmailValid(v.length > 3 && v.includes("@") && v.includes("."));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter both email and password."); return; }
    setLoginStep("loading"); setIsLoading(true);
    setTimeout(() => {
      setLoginStep("success");
      localStorage.setItem("adminAuth", JSON.stringify({ email, isAuthenticated: true, loginTime: new Date().toISOString() }));
      setTimeout(() => navigate("/admin"), 900);
    }, 1400);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmailValid) return;
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setResendTimer(30); setScreen("otp"); }, 1200);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1); setOtp(next); setOtpError("");
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const handleVerifyOtp = () => {
    if (otp.join("").length < 6) { setOtpError("Please enter the 6-digit code."); return; }
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setScreen("reset"); }, 1000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault(); setResetError("");
    if (newPassword.length < 6) { setResetError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setResetError("Passwords do not match."); return; }
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setScreen("done"); }, 1200);
  };

  // Shared style helpers
  const wrapStyle = (focused: boolean, valid?: boolean | null): React.CSSProperties => ({
    position: "relative", borderRadius: "12px",
    border: focused ? "1.5px solid #e8b84b" : valid === false ? "1.5px solid rgba(239,68,68,0.6)" : valid === true ? "1.5px solid rgba(34,197,94,0.5)" : "1.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)", transition: "border-color 0.2s",
  });
  const inputStyle: React.CSSProperties = { width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px", padding: "14px 16px 14px 44px", borderRadius: "12px", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" };
  const btnStyle = (bg: string, color: string, disabled?: boolean): React.CSSProperties => ({
    width: "100%", padding: "15px", borderRadius: "12px", border: "none", background: bg, color, fontSize: "14px",
    fontWeight: 800, letterSpacing: "0.5px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1,
    transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", textTransform: "uppercase",
  });
  const iconPos: React.CSSProperties = { position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" };
  const Spinner = () => <div style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.25)", borderTop: "2px solid #000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />;
  const GreenBadge = () => (
    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <ShieldCheck size={11} color="#22c55e" />
    </div>
  );
  const ErrBox = ({ msg }: { msg: string }) => (
    <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
      <AlertCircle size={15} color="#f87171" /><span style={{ fontSize: "13px", color: "#f87171" }}>{msg}</span>
    </div>
  );
  const BackBtn = ({ to }: { to: Screen }) => (
    <button onClick={() => setScreen(to)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "13px", marginBottom: "2rem", padding: 0 }}>
      <ArrowLeft size={15} /> Back
    </button>
  );
  const IconBox = ({ icon }: { icon: React.ReactNode }) => (
    <div style={{ width: "56px", height: "56px", background: "rgba(232,184,75,0.1)", border: "1px solid rgba(232,184,75,0.2)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
      {icon}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", fontFamily: "'Inter','Segoe UI',sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fi { animation: fadeIn 0.3s ease forwards; }
        input::placeholder { color: rgba(255,255,255,0.2) !important; }
      `}</style>

      {/* BG */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(232,184,75,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,184,75,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-120px", left: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(232,184,75,0.10) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(232,184,75,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* Left brand panel — only on login screen */}
      {screen === "login" && (
        <div style={{ flex: "0 0 42%", display: "none", flexDirection: "column", justifyContent: "space-between", padding: "3rem", borderRight: "1px solid rgba(255,255,255,0.06)" }} className="lg-flex">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", background: "#e8b84b", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}><Wrench size={22} color="#000" /></div>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>GARIX</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#e8b84b", background: "rgba(232,184,75,0.12)", border: "1px solid rgba(232,184,75,0.25)", padding: "2px 8px", borderRadius: "20px", textTransform: "uppercase" }}>Admin</span>
          </div>
          <div>
            <div style={{ width: "52px", height: "3px", background: "#e8b84b", borderRadius: "2px", marginBottom: "28px" }} />
            <h1 style={{ fontSize: "38px", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "18px", letterSpacing: "-1px" }}>Welcome to the<br /><span style={{ color: "#e8b84b" }}>Control Panel</span></h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "320px" }}>Manage your bookings, services, customers, and analytics from one powerful dashboard.</p>
            <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[["Real-time booking management", "Track and manage all appointments live"], ["Customer analytics", "Insights on customer behaviour and trends"], ["Service & inventory control", "Update services, pricing and availability"]].map(([t, d], i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "32px", height: "32px", background: "rgba(232,184,75,0.1)", border: "1px solid rgba(232,184,75,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><ShieldCheck size={15} color="#e8b84b" /></div>
                  <div><div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{t}</div><div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            {[["5,000+", "Cars Repaired"], ["98%", "Satisfaction"], ["20 yrs", "Experience"]].map(([n, l], i) => (
              <div key={i}><div style={{ fontSize: "22px", fontWeight: 900, color: "#e8b84b" }}>{n}</div><div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>{l}</div></div>
            ))}
          </div>
        </div>
      )}

      {/* Right form panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* ─── LOGIN ─── */}
          {screen === "login" && (
            <div className="fi">
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84b", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Secure Access</p>
                <h2 style={{ fontSize: "30px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "8px" }}>Sign in to dashboard</h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <div style={wrapStyle(focusedField === "email", emailValid)}>
                    <Mail size={16} color={focusedField === "email" ? "#e8b84b" : "rgba(255,255,255,0.3)"} style={iconPos} />
                    <input ref={emailRef} type="email" placeholder="admin@garix.com" value={email}
                      onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                      style={inputStyle} />
                    {emailValid === true && <GreenBadge />}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                    <button type="button"
                      onClick={() => { setForgotEmail(email); validateForgotEmail(email); setScreen("forgot"); setError(""); }}
                      style={{ fontSize: "12px", color: "#e8b84b", background: "none", border: "none", cursor: "pointer", fontWeight: 700, padding: 0 }}>
                      Forgot password?
                    </button>
                  </div>
                  <div style={wrapStyle(focusedField === "password")}>
                    <Lock size={16} color={focusedField === "password" ? "#e8b84b" : "rgba(255,255,255,0.3)"} style={iconPos} />
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••••" value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, padding: "14px 48px 14px 44px" }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex" }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && <ErrBox msg={error} />}

                <button type="submit" disabled={isLoading}
                  style={btnStyle(loginStep === "success" ? "#22c55e" : "#e8b84b", loginStep === "success" ? "#fff" : "#000", isLoading && loginStep !== "success")}>
                  {loginStep === "loading" && <Spinner />}
                  {loginStep === "success" && <ShieldCheck size={17} />}
                  {loginStep === "idle" && <ArrowRight size={17} />}
                  {loginStep === "idle" ? "Sign In to Dashboard" : loginStep === "loading" ? "Authenticating..." : "Access Granted"}
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontWeight: 600, letterSpacing: "1px" }}>DEMO ACCESS</span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </div>

              <div style={{ background: "rgba(232,184,75,0.06)", border: "1px solid rgba(232,184,75,0.18)", borderRadius: "12px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#e8b84b", textTransform: "uppercase", letterSpacing: "1px" }}>Demo Credentials</span>
                  <button type="button" onClick={() => { setEmail("admin@garix.com"); setPassword("admin123"); validateEmail("admin@garix.com"); }}
                    style={{ background: "rgba(232,184,75,0.15)", border: "1px solid rgba(232,184,75,0.3)", borderRadius: "6px", color: "#e8b84b", fontSize: "11px", fontWeight: 700, padding: "4px 10px", cursor: "pointer" }}>
                    Auto-fill
                  </button>
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}><span style={{ color: "rgba(255,255,255,0.3)", marginRight: "6px" }}>Email:</span><code style={{ color: "#e8b84b", fontSize: "12px" }}>admin@garix.com</code></div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}><span style={{ color: "rgba(255,255,255,0.3)", marginRight: "6px" }}>Password:</span><code style={{ color: "#e8b84b", fontSize: "12px" }}>any password</code></div>
              </div>

              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <Link to="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Back to Garix website</Link>
              </div>
            </div>
          )}

          {/* ─── FORGOT EMAIL ─── */}
          {screen === "forgot" && (
            <div className="fi">
              <BackBtn to="login" />
              <IconBox icon={<KeyRound size={26} color="#e8b84b" />} />
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "8px" }}>Forgot Password?</h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "2rem", lineHeight: 1.7 }}>
                Enter your registered email and we'll send a 6-digit OTP to reset your password.
              </p>
              <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Registered Email</label>
                  <div style={wrapStyle(focusedField === "femail", forgotEmailValid)}>
                    <Mail size={16} color={focusedField === "femail" ? "#e8b84b" : "rgba(255,255,255,0.3)"} style={iconPos} />
                    <input type="email" placeholder="admin@garix.com" value={forgotEmail}
                      onChange={(e) => { setForgotEmail(e.target.value); validateForgotEmail(e.target.value); }}
                      onFocus={() => setFocusedField("femail")} onBlur={() => setFocusedField(null)}
                      style={inputStyle} />
                    {forgotEmailValid === true && <GreenBadge />}
                  </div>
                </div>
                <button type="submit" disabled={!forgotEmailValid || forgotLoading} style={btnStyle("#e8b84b", "#000", !forgotEmailValid || forgotLoading)}>
                  {forgotLoading ? <Spinner /> : <ArrowRight size={17} />}
                  {forgotLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </div>
          )}

          {/* ─── OTP ─── */}
          {screen === "otp" && (
            <div className="fi">
              <BackBtn to="forgot" />
              <IconBox icon={<Mail size={26} color="#e8b84b" />} />
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "8px" }}>Check Your Email</h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>We sent a 6-digit OTP to</p>
              <p style={{ fontSize: "14px", color: "#e8b84b", fontWeight: 700, marginBottom: "2rem" }}>{forgotEmail}</p>

              {/* OTP boxes */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
                {otp.map((digit, i) => (
                  <input key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onFocus={() => setFocusedField(`otp${i}`)} onBlur={() => setFocusedField(null)}
                    style={{
                      width: "52px", height: "58px", textAlign: "center", fontSize: "22px", fontWeight: 800,
                      color: "#fff", background: digit ? "rgba(232,184,75,0.1)" : "rgba(255,255,255,0.04)",
                      border: focusedField === `otp${i}` ? "2px solid #e8b84b" : digit ? "2px solid rgba(232,184,75,0.4)" : "1.5px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px", outline: "none", transition: "all 0.15s", caretColor: "#e8b84b",
                    }}
                  />
                ))}
              </div>

              {otpError && <div style={{ marginBottom: "12px" }}><ErrBox msg={otpError} /></div>}

              {/* Demo hint */}
              <div style={{ background: "rgba(232,184,75,0.06)", border: "1px solid rgba(232,184,75,0.15)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Demo OTP: <code style={{ color: "#e8b84b" }}>123456</code></span>
                <button onClick={() => setOtp(["1","2","3","4","5","6"])} style={{ fontSize: "11px", color: "#e8b84b", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Auto-fill</button>
              </div>

              <button onClick={handleVerifyOtp} disabled={forgotLoading} style={btnStyle("#e8b84b", "#000", forgotLoading)}>
                {forgotLoading ? <Spinner /> : <ShieldCheck size={17} />}
                {forgotLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {resendTimer > 0
                  ? <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>Resend in <span style={{ color: "#e8b84b" }}>{resendTimer}s</span></span>
                  : <button onClick={() => { setResendTimer(30); setOtp(["","","","","",""]); }}
                      style={{ fontSize: "13px", color: "#e8b84b", background: "none", border: "none", cursor: "pointer", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <RefreshCw size={13} /> Resend OTP
                    </button>
                }
              </div>
            </div>
          )}

          {/* ─── RESET PASSWORD ─── */}
          {screen === "reset" && (
            <div className="fi">
              <IconBox icon={<Lock size={26} color="#e8b84b" />} />
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "8px" }}>Set New Password</h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>Create a strong password for your account.</p>

              <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>New Password</label>
                  <div style={wrapStyle(focusedField === "np")}>
                    <Lock size={16} color={focusedField === "np" ? "#e8b84b" : "rgba(255,255,255,0.3)"} style={iconPos} />
                    <input type={showNewPassword ? "text" : "password"} placeholder="Min. 6 characters" value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setFocusedField("np")} onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, padding: "14px 48px 14px 44px" }} />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex" }}>
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {newPassword.length > 0 && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                        {[1,2,3,4].map((lvl) => (
                          <div key={lvl} style={{ flex: 1, height: "3px", borderRadius: "2px", transition: "background 0.3s",
                            background: newPassword.length >= lvl * 2 ? (newPassword.length >= 8 ? "#22c55e" : newPassword.length >= 6 ? "#e8b84b" : "#f87171") : "rgba(255,255,255,0.1)" }} />
                        ))}
                      </div>
                      <span style={{ fontSize: "11px", color: newPassword.length >= 8 ? "#22c55e" : newPassword.length >= 6 ? "#e8b84b" : "#f87171" }}>
                        {newPassword.length < 6 ? "Weak" : newPassword.length < 8 ? "Fair" : "Strong"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={wrapStyle(focusedField === "cp", confirmPassword ? confirmPassword === newPassword : null)}>
                    <Lock size={16} color={focusedField === "cp" ? "#e8b84b" : "rgba(255,255,255,0.3)"} style={iconPos} />
                    <input type="password" placeholder="Re-enter password" value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("cp")} onBlur={() => setFocusedField(null)}
                      style={{ ...inputStyle, padding: "14px 16px 14px 44px" }} />
                    {confirmPassword && confirmPassword === newPassword && <GreenBadge />}
                  </div>
                </div>

                {resetError && <ErrBox msg={resetError} />}

                <button type="submit" disabled={forgotLoading} style={btnStyle("#e8b84b", "#000", forgotLoading)}>
                  {forgotLoading ? <Spinner /> : <ShieldCheck size={17} />}
                  {forgotLoading ? "Updating Password..." : "Reset Password"}
                </button>
              </form>
            </div>
          )}

          {/* ─── SUCCESS ─── */}
          {screen === "done" && (
            <div className="fi" style={{ textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
                <CheckCircle2 size={40} color="#22c55e" />
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#fff", marginBottom: "12px" }}>Password Reset!</h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
                Your password has been updated successfully.<br />You can now sign in with your new password.
              </p>
              <button onClick={() => { setScreen("login"); setOtp(["","","","","",""]); setNewPassword(""); setConfirmPassword(""); }}
                style={btnStyle("#e8b84b", "#000")}>
                <ArrowRight size={17} /> Back to Sign In
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}