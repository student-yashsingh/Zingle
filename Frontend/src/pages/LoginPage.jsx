import { useState } from "react";
import { Video } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* LEFT FORM SECTION */}
        <div className="w-full lg:w-1/2 p-5 sm:p-8 flex flex-col">
          
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Video className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Zingle
            </span>
          </div>

          {/* Friendly headline */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back yaar 👋</h2>
            <p className="text-sm opacity-70 mt-1">
              Quick login & chalo start karein — real time chats, bina time waste kiye.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control w-full space-y-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="hello@zingle.app"
                className="input input-bordered w-full"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-control w-full space-y-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center mt-3">
              <p className="text-sm opacity-75">
                New here?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT ILLUSTRATION SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <img
              src="/Zingle_img1.png"
              alt="Real-time call preview"
              className="w-full h-[340px] object-cover rounded-lg"
            />

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Bas phone uthao & start talking.
              </h2>
              <p className="opacity-70 text-sm leading-relaxed">
                Instant Calls, Instant Replies —  
                real time conversations that feel real.  
                Made in India. Loved everywhere 🌍
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
