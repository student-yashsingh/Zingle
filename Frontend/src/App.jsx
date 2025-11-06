// import { Navigate, Route, Routes } from "react-router";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import SignUpPage from "./pages/SignUpPage.jsx";
// import OnBoardingPage from "./pages/OnBoardingPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import NotificationsPage from "./pages/NotificationsPage.jsx";
// import ChatPage from "./pages/ChatPage.jsx";
// import { Toaster, toast } from "react-hot-toast";
// import { useQuery}  from "@tanstack/react-query";
// import { axiosInstance } from "./libs/axios.js";

// const App = () => { 
//   const {data:authData,isLoading,error}=useQuery({queryKey:["authUser"],
//     queryFn: async()=>{
//       const res=await axiosInstance.get("https://jsonplaceholder.typicode.com/todos");
//       return res.data;
//     },
//     retry:false,
//   });
//   const authUser= authData?.user
//   return (
//     <div className="h-screen" data-theme="sunset">
//       <button
//         onClick={() => toast.success("Hello World!")}
//         className="btn btn-primary m-4"
//       >
//         Create a Toast
//       </button>

//       <Routes>
//         <Route path="/" element={authUser ? <HomePage />:<Navigate to="/login" />} />
//         <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/" />} />
//         <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/" />} />
//         <Route path="/onboarding" element={authUser?<OnBoardingPage />:<Navigate to="/login" />} />
//         <Route path="/call" element={authUser?<CallPage />} />
//         <Route path="/notifications" element={authUser?<NotificationsPage />: <Navigate to="/login" />} />
//         <Route path="/chat" element={authUser?<ChatPage />} />
//       </Routes>

//       <Toaster/> 
//     </div>
//   );
// };

// export default App;





import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {
  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      // TODO: switch to your real session endpoint, e.g. /api/auth/me
      const res = await axiosInstance.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      // shape to { user: {...} } so authData?.user works
      return { user: res.data };
    },
    retry: false,
  });

  const authUser = authData?.user ?? null;

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center" data-theme="sunset">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen grid place-items-center p-6 text-center" data-theme="sunset">
        <div>
          <p className="text-lg font-semibold">Failed to load session</p>
          <p className="opacity-70 text-sm mt-1">
            {String(error?.message || "Something went wrong")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen" data-theme="sunset">
      <button
        onClick={() => toast.success("Hello World!")}
        className="btn btn-primary m-4"
      >
        Create a Toast
      </button>

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />
        {/* <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
        /> */}
        <Route path="/signup" element={<SignUpPage />} />

        {/* <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        /> */}
        <Route path="/login" element={<LoginPage />} />

        {/* <Route
          path="/onboarding"
          element={authUser ? <OnBoardingPage /> : <Navigate to="/login" replace />}
        /> */}
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" replace />}
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={<Navigate to={authUser ? "/" : "/login"} replace />}
        />
      </Routes>

      
    </div>
  );
};

export default App;

