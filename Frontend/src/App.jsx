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





import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;