// import { useState } from "react";
// import { Video } from "lucide-react";
// import { Link } from "react-router-dom";
// import useSignUp from "../hooks/useSignUp";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import "../zingle-theme.css";

// const Background = () => {
//   const particles = Array.from({ length: 18 }, (_, i) => ({
//     id: i,
//     x: `${8 + (i * 5.2) % 84}%`,
//     size: 1.5 + (i % 3),
//     dur: `${5 + (i % 6)}s`,
//     delay: `${(i * 0.7) % 9}s`,
//     tx: `${((i % 5) - 2) * 22}px`,
//     color: i % 3 === 0 ? "#25d366" : i % 3 === 1 ? "#3b8ef0" : "#0ea5a0",
//   }));
//   return (
//     <div className="zg-bg">
//       <div className="zg-orb zg-orb-1" style={{ animationDelay: "1s" }} />
//       <div className="zg-orb zg-orb-2" />
//       <div className="zg-orb zg-orb-3" style={{ animationDelay: "3s" }} />
//       <div className="zg-orb zg-orb-4" style={{ animationDelay: "5s" }} />
//       <div className="zg-grid-layer" />
//       <div className="zg-scan" style={{ animationDelay: "4s" }} />
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           className="zg-particle"
//           style={{
//             left: p.x,
//             bottom: "-10px",
//             width: p.size,
//             height: p.size,
//             background: p.color,
//             "--dur": p.dur,
//             "--delay": p.delay,
//             "--tx": p.tx,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const strengthLabel = (pw) => {
//   if (!pw) return null;
//   if (pw.length < 6) return { label: "Too short", color: "#ef4444", pct: 18 };
//   if (pw.length < 8) return { label: "Weak", color: "#f97316", pct: 38 };
//   const score =
//     (/[A-Z]/.test(pw) ? 1 : 0) +
//     (/[0-9]/.test(pw) ? 1 : 0) +
//     (/[^A-Za-z0-9]/.test(pw) ? 1 : 0);
//   if (score === 0) return { label: "Fair", color: "#eab308", pct: 55 };
//   if (score === 1) return { label: "Good", color: "#22c55e", pct: 78 };
//   return { label: "Strong 💪", color: "#25d366", pct: 100 };
// };

// const SignUpPage = () => {
//   const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
//   const [showPass, setShowPass] = useState(false);
//   const [agreed, setAgreed] = useState(false);
//   const { isPending, error, signupMutation } = useSignUp();
//   const strength = strengthLabel(signupData.password);

//   const handleSignup = (e) => {
//     e.preventDefault();
//     signupMutation(signupData);
//   };

//   const handleGoogleAuth = async (credentialResponse) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
//         { token: credentialResponse.credential },
//         { withCredentials: true }
//       );
//       localStorage.setItem("token", res.data.access_token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       window.location.href = "/";
//     } catch (err) {
//       console.error("Google signup failed", err);
//     }
//   };

//   return (
//     <div className="zg-page">
//       <Background />

//       <div
//         className="zg-card zg-two-col"
//         style={{
//           width: "100%",
//           maxWidth: "1020px",
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//         }}
//       >
//         {/* ── LEFT: Form ── */}
//         <div style={{ padding: "44px 52px 52px", display: "flex", flexDirection: "column" }}>

//           {/* Logo */}
//           <div className="zg-logo" style={{ marginBottom: "36px", animation: "fadeUp 0.6s 0.05s ease both", opacity: 0 }}>
//             <div className="zg-logo-icon"><Video size={20} color="#fff" /></div>
//             <span className="zg-logo-text">Zingle</span>
//           </div>

//           {/* Heading */}
//           <div style={{ marginBottom: "28px", animation: "fadeUp 0.6s 0.15s ease both", opacity: 0 }}>
//             <div className="zg-badge zg-badge-blue" style={{ marginBottom: "14px" }}>
//               ✨ Join the conversation
//             </div>
//             <h1 className="zg-h1">Create your account</h1>
//             <p className="zg-subtitle">
//               HD calls & lightning-fast chat — <em>built in India, ready for the world.</em>
//             </p>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="zg-error" style={{ marginBottom: "16px" }}>
//               {error?.response?.data?.message || "Something went wrong. Try again."}
//             </div>
//           )}

//           {/* Form */}
//           <form
//             onSubmit={handleSignup}
//             style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeUp 0.6s 0.25s ease both", opacity: 0 }}
//           >
//             {/* Full Name */}
//             <div>
//               <label className="zg-label">Full Name</label>
//               <input
//                 type="text"
//                 className="zg-input"
//                 placeholder="Yash Singh"
//                 value={signupData.fullName}
//                 onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="zg-label">Email</label>
//               <input
//                 type="email"
//                 className="zg-input"
//                 placeholder="yash@zingle.app"
//                 value={signupData.email}
//                 onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <div className="zg-label-row">
//                 <label className="zg-label" style={{ margin: 0 }}>Password</label>
//                 <span className="zg-label-hint">at least 8 characters</span>
//               </div>
//               <div className="zg-input-wrap">
//                 <input
//                   type={showPass ? "text" : "password"}
//                   className="zg-input"
//                   placeholder="••••••••"
//                   style={{ paddingRight: "52px" }}
//                   value={signupData.password}
//                   onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                   required
//                 />
//                 <button type="button" className="zg-pass-toggle" onClick={() => setShowPass(!showPass)}>
//                   {showPass ? "Hide" : "Show"}
//                 </button>
//               </div>
//               {/* Strength meter */}
//               {strength && (
//                 <>
//                   <div className="zg-strength-track">
//                     <div className="zg-strength-fill" style={{ width: `${strength.pct}%`, background: strength.color }} />
//                   </div>
//                   <div className="zg-strength-label" style={{ color: strength.color }}>{strength.label}</div>
//                 </>
//               )}
//             </div>

//             {/* Terms */}
//             <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
//               <input
//                 type="checkbox"
//                 className="zg-checkbox"
//                 checked={agreed}
//                 onChange={(e) => setAgreed(e.target.checked)}
//                 required
//               />
//               <span style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
//                 I agree to the{" "}
//                 <a href="#" className="zg-link">Terms</a> &amp;{" "}
//                 <a href="#" className="zg-link">Privacy Policy</a>.
//               </span>
//             </label>

//             {/* Submit */}
//             <button type="submit" className="zg-btn-primary" disabled={isPending}>
//               <div className="zg-btn-inner">
//                 {isPending ? <><div className="zg-spinner" /> Creating your account…</> : "Create Account →"}
//               </div>
//             </button>

//             <div className="zg-divider">
//               <div className="zg-divider-line" />
//               <span className="zg-divider-text">or sign up with</span>
//               <div className="zg-divider-line" />
//             </div>

//             <div className="zg-google-wrap">
//               <GoogleLogin onSuccess={handleGoogleAuth} onError={() => console.log("Google Signup Failed")} text="signup_with" />
//             </div>

//             <p className="zg-footer-text">
//               Already with us? <Link to="/login" className="zg-link">Sign in</Link>
//             </p>
//           </form>
//         </div>

//         {/* ── RIGHT: Visual ── */}
//         <div className="zg-right-panel">
//           <div className="zg-badge zg-badge-green">
//             <span>🇮🇳</span> Made in India
//           </div>

//           <div className="zg-img-frame">
//             <img src="/Zingle_img2.png" alt="Real-time call preview" style={{ height: "300px" }} />
//             <div className="zg-img-overlay" />
//             <div className="zg-img-pill">
//               <div className="zg-live-dot" style={{ width: 6, height: 6 }} /> Encrypted
//             </div>
//           </div>

//           <div className="zg-tagline">
//             <h2>Call anyone. Chat instantly.</h2>
//             <p>
//               From Kashmir to Kanyakumari —<br />
//               crystal-clear calls & ultra-fast messages. 🌍
//             </p>
//           </div>

//           <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
//             {["HD Video", "End-to-end encrypted", "Real-time chat", "Zero lag"].map((f) => (
//               <div className="zg-chip" key={f}><span className="zg-chip-check">✓</span> {f}</div>
//             ))}
//           </div>

//           <div className="zg-stats">
//             <div className="zg-stat">
//               <div className="zg-stat-num">10ms</div>
//               <div className="zg-stat-label">Latency</div>
//             </div>
//             <div className="zg-stat-sep" />
//             <div className="zg-stat">
//               <div className="zg-stat-num">HD</div>
//               <div className="zg-stat-label">Video</div>
//             </div>
//             <div className="zg-stat-sep" />
//             <div className="zg-stat">
//               <div className="zg-stat-num">100%</div>
//               <div className="zg-stat-label">Secure</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;





import { useState } from "react";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import "../zingle-theme.css";

const Background = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${8 + (i * 5.2) % 84}%`,
    size: 1.5 + (i % 3),
    dur: `${5 + (i % 6)}s`,
    delay: `${(i * 0.7) % 9}s`,
    tx: `${((i % 5) - 2) * 22}px`,
    color: i % 3 === 0 ? "#25d366" : i % 3 === 1 ? "#3b8ef0" : "#0ea5a0",
  }));
  return (
    <div className="zg-bg">
      <div className="zg-orb zg-orb-1" style={{ animationDelay: "1s" }} />
      <div className="zg-orb zg-orb-2" />
      <div className="zg-orb zg-orb-3" style={{ animationDelay: "3s" }} />
      <div className="zg-orb zg-orb-4" style={{ animationDelay: "5s" }} />
      <div className="zg-grid-layer" />
      <div className="zg-scan" style={{ animationDelay: "4s" }} />
      {particles.map((p) => (
        <div
          key={p.id}
          className="zg-particle"
          style={{
            left: p.x,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            "--dur": p.dur,
            "--delay": p.delay,
            "--tx": p.tx,
          }}
        />
      ))}
    </div>
  );
};

const strengthLabel = (pw) => {
  if (!pw) return null;
  if (pw.length < 6) return { label: "Too short", color: "#ef4444", pct: 18 };
  if (pw.length < 8) return { label: "Weak", color: "#f97316", pct: 38 };
  const score =
    (/[A-Z]/.test(pw) ? 1 : 0) +
    (/[0-9]/.test(pw) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(pw) ? 1 : 0);
  if (score === 0) return { label: "Fair", color: "#eab308", pct: 55 };
  if (score === 1) return { label: "Good", color: "#22c55e", pct: 78 };
  return { label: "Strong 💪", color: "#25d366", pct: 100 };
};

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { isPending, error, signupMutation } = useSignUp();
  const strength = strengthLabel(signupData.password);

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  // Session is handled by the HTTP-only cookie set by the backend,
  // so nothing is stored in localStorage.
  const handleGoogleAuth = async (credentialResponse) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      window.location.href = "/";
    } catch (err) {
      console.error("Google signup failed", err);
      toast.error(
        err.response?.data?.message || "Google sign up failed. Please try again."
      );
    }
  };

  return (
    <div className="zg-page">
      <Background />

      <div
        className="zg-card zg-two-col"
        style={{
          width: "100%",
          maxWidth: "1020px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* ── LEFT: Form ── */}
        <div style={{ padding: "44px 52px 52px", display: "flex", flexDirection: "column" }}>

          {/* Logo */}
          <div className="zg-logo" style={{ marginBottom: "36px", animation: "fadeUp 0.6s 0.05s ease both", opacity: 0 }}>
            <div className="zg-logo-icon"><Video size={20} color="#fff" /></div>
            <span className="zg-logo-text">Zingle</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "28px", animation: "fadeUp 0.6s 0.15s ease both", opacity: 0 }}>
            <div className="zg-badge zg-badge-blue" style={{ marginBottom: "14px" }}>
              ✨ Join the conversation
            </div>
            <h1 className="zg-h1">Create your account</h1>
            <p className="zg-subtitle">
              HD calls & real-time chat — <em>built in India, ready for the world.</em>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="zg-error" style={{ marginBottom: "16px" }}>
              {error?.response?.data?.message || "Something went wrong. Try again."}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeUp 0.6s 0.25s ease both", opacity: 0 }}
          >
            {/* Full Name */}
            <div>
              <label className="zg-label">Full Name</label>
              <input
                type="text"
                className="zg-input"
                placeholder="Yash Singh"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="zg-label">Email</label>
              <input
                type="email"
                className="zg-input"
                placeholder="yash@zingle.app"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="zg-label-row">
                <label className="zg-label" style={{ margin: 0 }}>Password</label>
                <span className="zg-label-hint">at least 8 characters</span>
              </div>
              <div className="zg-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  className="zg-input"
                  placeholder="••••••••"
                  style={{ paddingRight: "52px" }}
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  minLength={8}
                  required
                />
                <button type="button" className="zg-pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              {/* Strength meter */}
              {strength && (
                <>
                  <div className="zg-strength-track">
                    <div className="zg-strength-fill" style={{ width: `${strength.pct}%`, background: strength.color }} />
                  </div>
                  <div className="zg-strength-label" style={{ color: strength.color }}>{strength.label}</div>
                </>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="zg-btn-primary" disabled={isPending}>
              <div className="zg-btn-inner">
                {isPending ? <><div className="zg-spinner" /> Creating your account…</> : "Create Account →"}
              </div>
            </button>

            <div className="zg-divider">
              <div className="zg-divider-line" />
              <span className="zg-divider-text">or sign up with</span>
              <div className="zg-divider-line" />
            </div>

            <div className="zg-google-wrap">
              <GoogleLogin
                onSuccess={handleGoogleAuth}
                onError={() => toast.error("Google sign up failed. Please try again.")}
                text="signup_with"
              />
            </div>

            <p className="zg-footer-text">
              Already with us? <Link to="/login" className="zg-link">Sign in</Link>
            </p>
          </form>
        </div>

        {/* ── RIGHT: Visual ── */}
        <div className="zg-right-panel">
          <div className="zg-badge zg-badge-green">
            <span>🇮🇳</span> Made in India
          </div>

          <div className="zg-img-frame">
            <img src="/Zingle_img2.png" alt="Real-time call preview" style={{ height: "300px" }} />
            <div className="zg-img-overlay" />
            <div className="zg-img-pill">
              <div className="zg-live-dot" style={{ width: 6, height: 6 }} /> Live
            </div>
          </div>

          <div className="zg-tagline">
            <h2>Call friends. Chat instantly.</h2>
            <p>
              From Kashmir to Kanyakumari —<br />
              HD calls & real-time messages. 🌍
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {["HD Video", "Real-time chat", "Google sign-in", "Language partners"].map((f) => (
              <div className="zg-chip" key={f}><span className="zg-chip-check">✓</span> {f}</div>
            ))}
          </div>

          <div className="zg-stats">
            <div className="zg-stat">
              <div className="zg-stat-num">HD</div>
              <div className="zg-stat-label">Video</div>
            </div>
            <div className="zg-stat-sep" />
            <div className="zg-stat">
              <div className="zg-stat-num">Live</div>
              <div className="zg-stat-label">Chat</div>
            </div>
            <div className="zg-stat-sep" />
            <div className="zg-stat">
              <div className="zg-stat-num">JWT</div>
              <div className="zg-stat-label">Secure Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;