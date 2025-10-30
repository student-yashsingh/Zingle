import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster, toast } from "react-hot-toast";
import { useQuery}  from "@tanstack/react-query";


const App = () => { 
  const {data,isLoading,error}=useQuery({queryKey:"todos",
    queryFn: async()=>{
      const res=await fetch("https://jsonplaceholder.typicode.com/todos");
      const data=await res.json();
      return data;
    }
  });
  console.log(data);
  return (
    <div className="h-screen" data-theme="sunset">
      <button
        onClick={() => toast.success("Hello World!")}
        className="btn btn-primary m-4"
      >
        Create a Toast
      </button>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      <Toaster/> 
    </div>
  );
};

export default App;
