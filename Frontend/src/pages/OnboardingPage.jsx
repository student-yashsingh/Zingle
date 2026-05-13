// import { useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { completeOnboarding } from "../lib/api";
// import { LoaderIcon, MapPinIcon, Video, ShuffleIcon, CameraIcon } from "lucide-react";
// import { LANGUAGES } from "../constants";

// const OnboardingPage = () => {
//   const { authUser } = useAuthUser();
//   const queryClient = useQueryClient();

//   const [formState, setFormState] = useState({
//     fullName: authUser?.fullName || "",
//     nativeLanguage: authUser?.nativeLanguage || "",
//     learningLanguage: authUser?.learningLanguage || "",
//     location: authUser?.location || "",
//     profilePic: authUser?.profilePic || "",
//   });

//   const { mutate: onboardingMutation, isPending } = useMutation({
//     mutationFn: completeOnboarding,
//     onSuccess: () => {
//       toast.success("Profile saved ");
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onboardingMutation(formState);
//   };

//   const handleRandomAvatar = () => {
//     const idx = Math.floor(Math.random() * 100) + 1;
//     const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
//     setFormState({ ...formState, profilePic: randomAvatar });
//     toast.success("Your random avatar is ready now");
//   };

//   return (
//     <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8">
//       <div className="card bg-base-200 w-full max-w-3xl shadow-2xl rounded-2xl border border-primary/20">
//         <div className="card-body p-8 space-y-6">
//           <div className="text-center mb-4">
//             <h1 className="text-3xl font-bold">Almost done yaar</h1>
//             <p className="opacity-70 mt-1">
//               Just thoda sa personal touch — so Zingle feels like <span className="font-semibold">your</span> space 
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="size-32 rounded-full bg-base-300 overflow-hidden shadow-md">
//                 {formState.profilePic ? (
//                   <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <CameraIcon className="size-12 text-base-content opacity-40" />
//                   </div>
//                 )}
//               </div>

//               <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
//                 <ShuffleIcon className="size-4 mr-2" />
//                 Generate Random Avatar
//               </button>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Your Full Name</span>
//               </label>
//               <input
//                 type="text"
//                 value={formState.fullName}
//                 onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
//                 className="input input-bordered w-full"
//                 placeholder="e.g. Yash Singh"
//               />
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Bio</span>
//               </label>
//               <textarea
//                 value={formState.bio}
//                 onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
//                 className="textarea textarea-bordered h-24"
//                 placeholder="Say something cool about yourself…"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Aapki Mother Tongue?</span>
//                 </label>
//                 <select
//                   value={formState.nativeLanguage}
//                   onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select one</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`native-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-medium">Which language you're learning?</span>
//                 </label>
//                 <select
//                   value={formState.learningLanguage}
//                   onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select one</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`learning-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Location</span>
//               </label>
//               <div className="relative">
//                 <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 size-5" />
//                 <input
//                   type="text"
//                   value={formState.location}
//                   onChange={(e) => setFormState({ ...formState, location: e.target.value })}
//                   className="input input-bordered w-full pl-10"
//                   placeholder="Mumbai, India"
//                 />
//               </div>
//             </div>

//             <button className="btn btn-primary w-full btn-lg mt-4" disabled={isPending} type="submit">
//               {!isPending ? (
//                 <>
//                   <Video className="size-5 mr-2" />
//                   Done — Start Zingle!
//                 </>
//               ) : (
//                 <>
//                   <LoaderIcon className="animate-spin size-5 mr-2" />
//                   Updating…
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnboardingPage;



import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { MapPinIcon, Video, ShuffleIcon, CameraIcon, UploadIcon, XIcon } from "lucide-react";
import { LANGUAGES } from "../constants";
import "../zingle-theme.css";

/* ── Particles ── */
const Background = () => {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: `${5 + (i * 4.4) % 90}%`,
    size: 1.5 + (i % 3),
    dur: `${5 + (i % 7)}s`,
    delay: `${(i * 0.55) % 9}s`,
    tx: `${((i % 5) - 2) * 20}px`,
    color: i % 3 === 0 ? "#25d366" : i % 3 === 1 ? "#1a6fd4" : "#14c4bf",
  }));
  return (
    <div className="zg-bg">
      <div className="zg-orb zg-orb-1" style={{ animationDelay: "2s" }} />
      <div className="zg-orb zg-orb-2" />
      <div className="zg-orb zg-orb-3" style={{ animationDelay: "4s" }} />
      <div className="zg-orb zg-orb-4" style={{ animationDelay: "6s" }} />
      <div className="zg-grid-layer" />
      <div className="zg-scan" style={{ animationDelay: "1s" }} />
      <div
        className="zg-scan"
        style={{
          animationDelay: "6s",
          background: "linear-gradient(90deg, transparent, rgba(26,173,85,0.3), transparent)",
        }}
      />
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

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  const [avatarKey, setAvatarKey] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormState((prev) => ({ ...prev, profilePic: e.target.result }));
      setAvatarKey((k) => k + 1);
      toast.success("Photo uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    processImageFile(e.target.files[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processImageFile(e.dataTransfer.files[0]);
  };

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile saved!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const url = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState((prev) => ({ ...prev, profilePic: url }));
    setAvatarKey((k) => k + 1);
    toast.success("New avatar generated!");
  };

  return (
    <>
      <style>{`
        .ob-page {
          font-family: var(--font-body);
          min-height: 100vh;
          background: var(--blue-950);
          display: flex;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }

        /* ── Left decorative panel ── */
        .ob-left {
          width: 420px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 48px;
          border-right: 1px solid rgba(59,142,240,0.1);
          background: linear-gradient(170deg, rgba(18,81,163,0.12) 0%, rgba(26,173,85,0.08) 100%);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }
        @media(max-width:900px){ .ob-left { display: none; } }

        /* floating card inside left panel */
        .ob-preview-card {
          background: rgba(14,16,23,0.7);
          border: 1px solid rgba(59,142,240,0.18);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(16px);
          animation: floatCard 5s ease-in-out infinite;
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }

        .ob-preview-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-500), var(--green-500));
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 14px;
          box-shadow: 0 4px 16px rgba(26,111,212,0.4);
        }
        .ob-preview-name {
          font-family: var(--font-display);
          font-size: 16px; font-weight: 700;
          color: var(--text-primary); margin: 0 0 4px;
        }
        .ob-preview-lang {
          font-size: 12px; color: var(--text-muted);
          display: flex; align-items: center; gap: 6px;
        }
        .ob-preview-lang span {
          padding: 2px 8px; border-radius: 99px;
          font-size: 11px; font-weight: 600;
        }
        .ob-lang-native {
          background: rgba(26,111,212,0.15);
          color: var(--blue-300);
          border: 1px solid rgba(59,142,240,0.2);
        }
        .ob-lang-learning {
          background: rgba(26,173,85,0.12);
          color: var(--green-300);
          border: 1px solid rgba(37,211,102,0.2);
        }

        /* message bubbles */
        .ob-bubbles { margin-top: 28px; display: flex; flex-direction: column; gap: 10px; }
        .ob-bubble {
          padding: 11px 16px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.5;
          max-width: 90%;
          animation: fadeUp 0.5s ease both;
        }
        .ob-bubble-in {
          background: rgba(26,111,212,0.18);
          border: 1px solid rgba(59,142,240,0.2);
          color: var(--blue-200);
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        .ob-bubble-out {
          background: rgba(26,173,85,0.15);
          border: 1px solid rgba(37,211,102,0.2);
          color: var(--green-200);
          border-bottom-right-radius: 4px;
          align-self: flex-end;
        }
        .ob-bubble-time {
          font-size: 10px; color: var(--text-muted);
          margin-top: 2px;
          text-align: right;
        }

        /* call card */
        .ob-call-card {
          background: rgba(14,16,23,0.75);
          border: 1px solid rgba(26,173,85,0.25);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
          margin-top: 16px;
          backdrop-filter: blur(16px);
        }
        .ob-call-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green-400);
          box-shadow: 0 0 10px var(--green-400);
          animation: dotPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .ob-call-text { font-size: 13px; color: var(--text-secondary); }
        .ob-call-text strong { color: var(--green-300); font-weight: 600; }

        /* bottom quote */
        .ob-quote {
          font-size: 13px; color: var(--text-muted);
          font-style: italic; line-height: 1.6;
          border-left: 2px solid rgba(59,142,240,0.3);
          padding-left: 14px;
        }

        /* ── Right: main form ── */
        .ob-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 52px 64px 52px 72px;
          position: relative;
          z-index: 10;
          overflow-y: auto;
        }
        @media(max-width:600px){ .ob-right { padding: 32px 20px; } }

        /* step dots */
        .ob-steps {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 40px;
        }
        .ob-step-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(59,142,240,0.25);
          transition: all 0.3s;
        }
        .ob-step-dot.active {
          width: 24px; border-radius: 99px;
          background: linear-gradient(90deg, var(--blue-500), var(--green-500));
        }

        /* section divider */
        .ob-section-title {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.8px; text-transform: uppercase;
          color: var(--text-muted);
          margin: 28px 0 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .ob-section-title::after {
          content: '';
          flex: 1; height: 1px;
          background: rgba(59,142,240,0.1);
        }

        /* avatar upload area */
        .ob-avatar-area {
          display: flex; align-items: center; gap: 24px;
          padding: 20px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(59,142,240,0.2);
          border-radius: 16px;
          transition: border-color 0.2s, background 0.2s;
        }
        .ob-avatar-area:hover {
          border-color: rgba(59,142,240,0.4);
          background: rgba(26,111,212,0.04);
        }
        .ob-avatar-img {
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 2px solid rgba(26,173,85,0.35);
          overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          animation: ringPulse 3s ease-in-out infinite;
          transition: border-color 0.3s;
        }
        .ob-avatar-img img {
          width: 100%; height: 100%; object-fit: cover;
          animation: avatarPop 0.4s ease both;
        }
        .ob-avatar-info h4 {
          font-size: 14px; font-weight: 700;
          color: var(--text-primary); margin: 0 0 4px;
        }
        .ob-avatar-info p {
          font-size: 12px; color: var(--text-muted); margin: 0 0 12px; line-height: 1.5;
        }

        /* form grid */
        .ob-form-grid-2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        @media(max-width:560px){ .ob-form-grid-2 { grid-template-columns: 1fr; } }

        /* language selector with flag look */
        .ob-lang-select-wrap {
          position: relative;
        }
        .ob-lang-select-wrap::before {
          content: attr(data-icon);
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          font-size: 16px; pointer-events: none; z-index: 1;
        }
        .ob-lang-select-wrap .zg-select {
          padding-left: 40px;
        }
        .ob-lang-select-wrap::after {
          content: '▾';
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted); pointer-events: none; font-size: 12px;
        }

        /* submit area */
        .ob-submit-area {
          margin-top: 36px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .ob-submit-note {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 12px; color: var(--text-muted);
        }
        .ob-submit-note svg { color: var(--green-400); }
      `}</style>

      <div className="ob-page">
        <Background />

        {/* ══ LEFT PANEL ══ */}
        <div className="ob-left">
          {/* Logo */}
          <div>
            <div className="zg-logo" style={{ marginBottom: "40px" }}>
              <div className="zg-logo-icon"><Video size={20} color="#fff" /></div>
              <span className="zg-logo-text">Zingle</span>
            </div>

            {/* Fake profile preview card */}
            <div className="ob-preview-card">
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                <div className="ob-preview-avatar">
                  {formState.profilePic
                    ? <img src={formState.profilePic} alt="" key={avatarKey} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    : "👤"
                  }
                </div>
                <div>
                  <p className="ob-preview-name">
                    {formState.fullName || "Your Name"}
                  </p>
                  <div className="ob-preview-lang">
                    {formState.nativeLanguage
                      ? <span className="ob-lang-native">{formState.nativeLanguage}</span>
                      : <span className="ob-lang-native">Native</span>
                    }
                    <span style={{ color: "var(--text-muted)" }}>→</span>
                    {formState.learningLanguage
                      ? <span className="ob-lang-learning">{formState.learningLanguage}</span>
                      : <span className="ob-lang-learning">Learning</span>
                    }
                  </div>
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="ob-bubbles">
                <div>
                  <div className="ob-bubble ob-bubble-in">
                    Heyy! Want to practice Spanish together? 😊
                  </div>
                  <div className="ob-bubble-time" style={{ textAlign: "left" }}>2 min ago</div>
                </div>
                <div>
                  <div className="ob-bubble ob-bubble-out">
                    Claro que sí! Let's do it 🔥
                  </div>
                  <div className="ob-bubble-time">just now</div>
                </div>
              </div>
            </div>

            {/* Active call card */}
            <div className="ob-call-card">
              <div className="ob-call-dot" />
              <div className="ob-call-text">
                <strong>Priya from Mumbai</strong> is in a live call right now
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <div className="ob-quote">
            "Language is the road map of a culture. It tells you where its people come from and where they are going."
            <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--text-muted)", fontStyle: "normal" }}>— Rita Mae Brown</div>
          </div>
        </div>

        {/* ══ RIGHT PANEL: Form ══ */}
        <div className="ob-right">

          {/* Step indicator */}
          <div className="ob-steps">
            <div className="ob-step-dot" style={{ background: "var(--green-400)", width: 8 }} />
            <div className="ob-step-dot active" />
            <div className="ob-step-dot" />
            <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "6px" }}>
              Profile setup · Step 2 of 3
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "8px", animation: "fadeUp 0.6s 0.1s ease both", opacity: 0 }}>
            <h1 className="zg-h1" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
              Tell us about yourself
            </h1>
            <p className="zg-subtitle" style={{ marginTop: "8px", fontSize: "15px" }}>
              Help others find you — fill in your details and start connecting.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeUp 0.6s 0.2s ease both", opacity: 0 }}
          >

            {/* ── Profile Picture ── */}
            <div className="ob-section-title">Profile Picture</div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  flex: 1,
                  minHeight: "130px",
                  border: `2px dashed ${dragOver ? "rgba(26,173,85,0.7)" : "rgba(59,142,240,0.25)"}`,
                  borderRadius: "16px",
                  background: dragOver ? "rgba(26,173,85,0.06)" : "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  padding: "20px",
                }}
              >
                {formState.profilePic ? (
                  /* Preview */
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      key={avatarKey}
                      src={formState.profilePic}
                      alt="Profile preview"
                      onError={() => setFormState((p) => ({ ...p, profilePic: "" }))}
                      style={{
                        width: "80px", height: "80px",
                        borderRadius: "50%", objectFit: "cover",
                        border: "2px solid rgba(26,173,85,0.5)",
                        boxShadow: "0 0 20px rgba(26,173,85,0.2)",
                        animation: "avatarPop 0.4s ease both",
                        display: "block",
                      }}
                    />
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormState((p) => ({ ...p, profilePic: "" }));
                      }}
                      style={{
                        position: "absolute", top: "-6px", right: "-6px",
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: "rgba(239,68,68,0.9)", border: "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "#fff",
                      }}
                    >
                      <XIcon size={12} />
                    </button>
                    <p style={{ fontSize: "12px", color: "var(--green-300)", margin: "10px 0 0", textAlign: "center", fontWeight: 600 }}>
                      Click to change
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      background: "rgba(59,142,240,0.1)",
                      border: "1px solid rgba(59,142,240,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <UploadIcon size={20} color="var(--blue-300)" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
                        Upload your photo
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
                        Drag & drop or click to browse · JPG, PNG up to 5MB
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Divider */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <div style={{ flex: 1, width: "1px", background: "rgba(59,142,240,0.1)" }} />
                <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>or</span>
                <div style={{ flex: 1, width: "1px", background: "rgba(59,142,240,0.1)" }} />
              </div>

              {/* Random avatar */}
              <div style={{
                width: "160px", flexShrink: 0,
                border: "1px solid rgba(59,142,240,0.15)",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.02)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "12px", padding: "20px 16px",
              }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(26,111,212,0.3), rgba(26,173,85,0.3))",
                  border: "1px solid rgba(59,142,240,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px",
                }}>
                  🎭
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
                    Random Avatar
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "0 0 12px", lineHeight: 1.4 }}>
                    Don't want to share a photo?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="zg-btn-ghost"
                  style={{ fontSize: "12px", padding: "7px 14px", width: "100%", justifyContent: "center" }}
                >
                  <ShuffleIcon size={12} />
                  Randomize
                </button>
              </div>
            </div>

            {/* ── Basic Info ── */}
            <div className="ob-section-title">Basic Info</div>
            <div className="ob-form-grid-2">
              <div>
                <label className="zg-label">Full Name</label>
                <input
                  type="text"
                  className="zg-input"
                  placeholder="e.g. Yash Singh"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="zg-label">Location</label>
                <div className="zg-input-wrap">
                  <span className="zg-input-prefix"><MapPinIcon size={15} /></span>
                  <input
                    type="text"
                    className="zg-input zg-input-icon"
                    placeholder="Mumbai, India"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div style={{ marginTop: "20px" }}>
              <label className="zg-label">Bio</label>
              <textarea
                className="zg-textarea"
                placeholder="Tell others what you're interested in, what you do, or why you're here…"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                style={{ minHeight: "96px" }}
              />
            </div>

            {/* ── Languages ── */}
            <div className="ob-section-title">Languages</div>
            <div className="ob-form-grid-2">
              <div>
                <label className="zg-label">I speak (Native)</label>
                <div className="ob-lang-select-wrap zg-select-wrap" data-icon="🗣️">
                  <select
                    className="zg-select"
                    style={{ paddingLeft: "40px" }}
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  >
                    <option value="">Select your language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="zg-label">I'm learning</label>
                <div className="ob-lang-select-wrap zg-select-wrap" data-icon="📖">
                  <select
                    className="zg-select"
                    style={{ paddingLeft: "40px" }}
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  >
                    <option value="">Select a language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div className="ob-submit-area">
              <button
                type="submit"
                className="zg-btn-primary"
                disabled={isPending}
                style={{ height: "56px", fontSize: "16px", fontWeight: 700, borderRadius: "16px" }}
              >
                <div className="zg-btn-inner">
                  {isPending ? (
                    <><div className="zg-spinner" /> Saving your profile…</>
                  ) : (
                    <><Video size={18} /> Complete Profile & Start Zingle</>
                  )}
                </div>
              </button>
              <div className="ob-submit-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Your profile is private by default. Only matched users can see it.
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
