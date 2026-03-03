// import { useState } from "react";
// import { Video } from "lucide-react";
// import { Link } from "react-router-dom"; 
// import useSignUp from "../hooks/useSignUp";

// const SignUpPage = () => {
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { isPending, error, signupMutation } = useSignUp();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     signupMutation(signupData);
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-base-200/30"
//       data-theme="forest"
//     >
//       <div className="w-full max-w-6xl mx-auto">
//         <div className="relative border border-primary/25 flex flex-col lg:flex-row bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
//           {/* LEFT — SIGNUP FORM */}
//           <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">
//             {/* Brand */}
//             <div className="mb-7 flex items-center gap-3">
//               <span className="h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br from-primary/15 to-secondary/15 ring-1 ring-primary/30">
//                 <Video className="h-5 w-5 text-primary" />
//               </span>
//               <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-primary to-indigo-400">
//                 Zingle
//               </span>
//             </div>

//             {/* Copy */}
//             <div className="mb-6">
//               <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
//                 Join the real-time conversation
//               </h2>
//               <p className="mt-2 text-sm sm:text-base text-base-content/70">
//                 HD video calls and lightning-fast chat —{" "}
//                 <span className="font-medium text-base-content">built in India, ready for the world.</span>
//               </p>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="alert alert-error mb-4 rounded-xl">
//                 <span>{error?.response?.data?.message || "Something went wrong"}</span>
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSignup} className="space-y-4">
//               {/* Full Name */}
//               <label className="form-control w-full">
//                 <span className="label-text">Full Name</span>
//                 <input
//                   type="text"
//                   placeholder="Yash Singh"
//                   className="input input-bordered w-full rounded-xl bg-base-200/40 focus:input-primary"
//                   value={signupData.fullName}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, fullName: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               {/* Email */}
//               <label className="form-control w-full">
//                 <span className="label-text">Email</span>
//                 <input
//                   type="email"
//                   placeholder="yash@zingle.app"
//                   className="input input-bordered w-full rounded-xl bg-base-200/40 focus:input-primary"
//                   value={signupData.email}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, email: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               {/* Password */}
//               <label className="form-control w-full">
//                 <div className="flex items-center justify-between">
//                   <span className="label-text">Password</span>
//                   <span className="text-xs text-base-content/60">
//                     atleast 8 characters
//                   </span>
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="input input-bordered w-full rounded-xl bg-base-200/40 focus:input-primary"
//                   value={signupData.password}
//                   onChange={(e) =>
//                     setSignupData({ ...signupData, password: e.target.value })
//                   }
//                   required
//                 />
//               </label>

//               {/* Terms */}
//               <label className="flex items-center gap-3 pt-1">
//                 <input
//                   type="checkbox"
//                   className="checkbox checkbox-primary checkbox-sm"
//                   required
//                 />
//                 <span className="text-xs sm:text-sm text-base-content/70">
//                   I agree to the{" "}
//                   <a className="link link-primary">Terms</a> &{" "}
//                   <a className="link link-primary">Privacy</a>.
//                 </span>
//               </label>

//               {/* CTA */}
//               <button
//                 className="btn btn-primary w-full h-12 rounded-xl text-base font-semibold mt-1 hover:scale-[1.01] active:scale-[.99] transition-transform"
//                 type="submit"
//                 disabled={isPending}
//               >
//                 {isPending ? (
//                   <>
//                     <span className="loading loading-spinner loading-xs"></span>
//                     Creating your account…
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>

//               {/* Secondary */}
//               <p className="text-center text-sm text-base-content/70">
//                 Already with us?{" "}
//                 <Link to="/login" className="link link-secondary font-medium">
//                   Sign in
//                 </Link>
//               </p>

             
//             </form>
//           </div>

//           {/* RIGHT — VISUAL */}
//           <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-b from-primary/10 to-secondary/10 p-6">
//             <div className="w-full max-w-md">
//               {/* Image card */}
//               <div className="relative rounded-xl overflow-hidden ring-1 ring-primary/30 bg-base-100 shadow-xl">
//                 <img
//                   src="/Zingle_img2.png"
//                   alt="Real-time call preview_signup"
//                   className="w-full h-[340px] object-cover"
//                 />
//                 {/* top pills */}
//                 <div className="absolute top-3 right-3 backdrop-blur bg-base-100/85 border border-white/10 rounded-full px-3 py-1 text-xs shadow">
//                   Encrypted
//                 </div>
//                 {/* bottom gradient */}
//                 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base-100/95 to-transparent" />
//               </div>

//               {/* Copy */}
//               <div className="text-center mt-5 space-y-1">
//                 <h3 className="text-lg font-semibold">
//                   Call anyone. Chat instantly.
//                 </h3>
//                 <p className="text-sm text-base-content/70">
//                   From Kashmir to kanyaKumari — crystal-clear calls and ultra-fast messages.
//                 </p>
//               </div>

             

//               {/* Tagline */}
//               <p className="mt-3 text-center text-xs text-base-content/60">


//                 Made in India. Loved worldwide.
//               </p>
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

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }  // <- important
      );

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";
    } catch (err) {
      console.error("Google signup failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-base-200/30">
      <div className="w-full max-w-6xl mx-auto">
        <div className="border border-primary/25 flex flex-col lg:flex-row bg-base-100 rounded-2xl shadow-2xl overflow-hidden">

          {/* LEFT FORM */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10">

            <div className="mb-7 flex items-center gap-3">
              <Video className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold">Zingle</span>
            </div>

            {error && (
              <div className="alert alert-error mb-4 rounded-xl">
                <span>{error?.response?.data?.message}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />

              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Account"}
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-base-300"></div>
                <span className="px-3 text-sm opacity-70">OR</span>
                <div className="flex-1 h-px bg-base-300"></div>
              </div>

              {/* Google Signup */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleAuth}
                  onError={() => console.log("Google Signup Failed")}
                  text="signup_with"
                />
              </div>

              <p className="text-center text-sm opacity-75">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold">
                  Sign In
                </Link>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;