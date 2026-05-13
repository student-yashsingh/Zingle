// import { useState } from "react";
// import { Video } from "lucide-react";
// import { Link } from "react-router";
// import useLogin from "../hooks/useLogin";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const LoginPage = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const { isPending, error, loginMutation } = useLogin();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     loginMutation(loginData);
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
//       console.error("Google login failed", err);
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95">
//       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

//         {/* LEFT FORM SECTION */}
//         <div className="w-full lg:w-1/2 p-5 sm:p-8 flex flex-col">
          
//           {/* LOGO */}
//           <div className="mb-4 flex items-center justify-start gap-2">
//             <Video className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//               Zingle
//             </span>
//           </div>

//           <div className="mb-6">
//             <h2 className="text-2xl font-bold">Welcome back yaar 👋</h2>
//             <p className="text-sm opacity-70 mt-1">
//               Quick login & chalo start karein — real time chats, bina time waste kiye.
//             </p>
//           </div>

//           {error && (
//             <div className="alert alert-error mb-4">
//               <span>{error.response.data.message}</span>
//             </div>
//           )}

//           <form onSubmit={handleLogin} className="space-y-4">
            
//             <div className="form-control w-full space-y-2">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="hello@zingle.app"
//                 className="input input-bordered w-full"
//                 value={loginData.email}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="form-control w-full space-y-2">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="input input-bordered w-full"
//                 value={loginData.password}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={isPending}
//             >
//               {isPending ? (
//                 <>
//                   <span className="loading loading-spinner loading-xs"></span>
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </button>

//             {/* Divider */}
//             <div className="flex items-center my-4">
//               <div className="flex-1 h-px bg-base-300"></div>
//               <span className="px-3 text-sm opacity-70">OR</span>
//               <div className="flex-1 h-px bg-base-300"></div>
//             </div>

//             {/* Google Login */}
//             <div className="flex justify-center">
//               <GoogleLogin
//                 onSuccess={handleGoogleAuth}
//                 onError={() => console.log("Google Login Failed")}
//               />
//             </div>

//             <div className="text-center mt-3">
//               <p className="text-sm opacity-75">
//                 New here?{" "}
//                 <Link
//                   to="/signup"
//                   className="text-primary font-semibold hover:underline"
//                 >
//                   Create account
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
//           <div className="max-w-md p-8">
//             <img
//               src="/Zingle_img1.png"
//               alt="Real-time call preview"
//               className="w-full h-[340px] object-cover rounded-lg"
//             />
//             <div className="text-center space-y-3 mt-6">
//               <h2 className="text-xl font-semibold">
//                 Bas phone uthao & start talking.
//               </h2>
//               <p className="opacity-70 text-sm leading-relaxed">
//                 Instant Calls, Instant Replies — real time conversations that feel real.
//                 Made in India. Loved everywhere 🌍
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { Video } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../zingle-theme.css";

/* ── Animated background ── */
const Background = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${8 + (i * 5.2) % 84}%`,
    size: 1.5 + (i % 3),
    dur: `${5 + (i % 6)}s`,
    delay: `${(i * 0.6) % 8}s`,
    tx: `${((i % 5) - 2) * 22}px`,
    color: i % 3 === 0 ? "#25d366" : i % 3 === 1 ? "#3b8ef0" : "#14c4bf",
  }));
  return (
    <div className="zg-bg">
      <div className="zg-orb zg-orb-1" />
      <div className="zg-orb zg-orb-2" />
      <div className="zg-orb zg-orb-3" />
      <div className="zg-orb zg-orb-4" />
      <div className="zg-grid-layer" />
      <div className="zg-scan" />
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

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      console.error("Google login failed", err);
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
        <div style={{ padding: "52px 52px 56px", display: "flex", flexDirection: "column" }}>

          {/* Logo */}
          <div className="zg-logo" style={{ marginBottom: "44px", animation: "fadeUp 0.6s 0.05s ease both", opacity: 0 }}>
            <div className="zg-logo-icon"><Video size={20} color="#fff" /></div>
            <span className="zg-logo-text">Zingle</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "32px", animation: "fadeUp 0.6s 0.15s ease both", opacity: 0 }}>
            <div className="zg-badge zg-badge-green" style={{ marginBottom: "14px" }}>
              <div className="zg-live-dot" />
              Real-time calls & chat
            </div>
            <h1 className="zg-h1">Welcome back 👋</h1>
            <p className="zg-subtitle">
              Jaldi login karo — <em>real-time chats</em> aur calls wait kar rahe hain.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="zg-error" style={{ marginBottom: "18px" }}>
              {error.response?.data?.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "18px", animation: "fadeUp 0.6s 0.25s ease both", opacity: 0 }}
          >
            <div>
              <label className="zg-label">Email</label>
              <input
                type="email"
                className="zg-input"
                placeholder="hello@zingle.app"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="zg-label">Password</label>
              <div className="zg-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  className="zg-input"
                  placeholder="••••••••"
                  style={{ paddingRight: "52px" }}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button type="button" className="zg-pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="zg-btn-primary" disabled={isPending} style={{ marginTop: "4px" }}>
              <div className="zg-btn-inner">
                {isPending ? <><div className="zg-spinner" /> Signing in…</> : "Sign In →"}
              </div>
            </button>

            <div className="zg-divider">
              <div className="zg-divider-line" />
              <span className="zg-divider-text">or continue with</span>
              <div className="zg-divider-line" />
            </div>

            <div className="zg-google-wrap">
              <GoogleLogin onSuccess={handleGoogleAuth} onError={() => console.log("Google Login Failed")} />
            </div>

            <p className="zg-footer-text">
              New here? <Link to="/signup" className="zg-link">Create account</Link>
            </p>
          </form>
        </div>

        {/* ── RIGHT: Visual ── */}
        <div className="zg-right-panel">
          <div className="zg-badge zg-badge-blue">
            <span>🇮🇳</span> Made in India · Loved Worldwide
          </div>

          <div className="zg-img-frame">
            <img src="/Zingle_img1.png" alt="Real-time call preview" style={{ height: "300px" }} />
            <div className="zg-img-overlay" />
            <div className="zg-img-pill">
              <div className="zg-live-dot" style={{ width: 6, height: 6 }} /> Live
            </div>
          </div>

          <div className="zg-tagline">
            <h2>Bas phone uthao & start talking.</h2>
            <p>Instant Calls, Instant Replies —<br />conversations that feel truly real. 🌍</p>
          </div>

          <div className="zg-stats">
            <div className="zg-stat">
              <div className="zg-stat-num">10ms</div>
              <div className="zg-stat-label">Latency</div>
            </div>
            <div className="zg-stat-sep" />
            <div className="zg-stat">
              <div className="zg-stat-num">HD</div>
              <div className="zg-stat-label">Video</div>
            </div>
            <div className="zg-stat-sep" />
            <div className="zg-stat">
              <div className="zg-stat-num">E2E</div>
              <div className="zg-stat-label">Encrypted</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {["Zero lag", "Crystal clear audio", "Group calls"].map((f) => (
              <div className="zg-chip" key={f}><span className="zg-chip-check">✓</span> {f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
