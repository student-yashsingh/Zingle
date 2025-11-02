import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster, toast } from "react-hot-toast";
import { useQuery}  from "@tanstack/react-query";
import { axiosInstance } from "./libs/axios.js";

const App = () => { 
  const {data:authData,isLoading,error}=useQuery({queryKey:["authUser"],
    queryFn: async()=>{
      const res=await axiosInstance.get("https://jsonplaceholder.typicode.com/todos");
      return res.data;
    },
    retry:false,
  });
  const authUser= authData?.user
  return (
    <div className="h-screen" data-theme="sunset">
      <button
        onClick={() => toast.success("Hello World!")}
        className="btn btn-primary m-4"
      >
        Create a Toast
      </button>

      <Routes>
        <Route path="/" element={authUser ? <HomePage />:<Navigate to="/login" />} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/" />} />
        <Route path="/onboarding" element={authUser?<OnBoardingPage />:<Navigate to="/login" />} />
        <Route path="/call" element={authUser?<CallPage />} />
        <Route path="/notifications" element={authUser?<NotificationsPage />: <Navigate to="/login" />} />
        <Route path="/chat" element={authUser?<ChatPage />} />
      </Routes>

      <Toaster/> 
    </div>
  );
};

export default App;





