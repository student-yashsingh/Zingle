// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, LogOutIcon, Video } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
// import useLogout from "../hooks/useLogout";

// const Navbar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");

//   // const queryClient = useQueryClient();
//   // const { mutate: logoutMutation } = useMutation({
//   //   mutationFn: logout,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   const { logoutMutation } = useLogout();

//   return (
//     <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-end w-full">
//           {/* LOGO - ONLY IN THE CHAT PAGE */}
//           {isChatPage && (
//             <div className="pl-5">
//               <Link to="/" className="flex items-center gap-2.5">
//                 <Video className="size-9 text-primary" />
//                 <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//                   Zingle
//                 </span>
//               </Link>
//             </div>
//           )}

//           <div className="flex items-center gap-3 sm:gap-4 ml-auto">
//             <Link to={"/notifications"}>
//               <button className="btn btn-ghost btn-circle">
//                 <BellIcon className="h-6 w-6 text-base-content opacity-70" />
//               </button>
//             </Link>
//           </div>

//           {/* TODO */}
//           <ThemeSelector />

//           <div className="avatar">
//             <div className="w-9 rounded-full">
//               <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
//             </div>
//           </div>

//           {/* Logout button */}
//           <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
//             <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;



import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, PhoneCall, Sparkles } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-30 h-16 backdrop-blur-xl bg-[#0f0f0f]/70 border-b border-[#1a1a1a] shadow-[0_8px_32px_rgba(0,255,135,0.05)]">
      <div className="container mx-auto px-5 flex items-center justify-between h-full">

        {/* LOGO when chat page */}
        {isChatPage ? (
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <PhoneCall className="size-8 text-emerald-400 drop-shadow-[0_0_6px_rgba(0,255,135,0.8)]" />
            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-green-200 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,255,135,0.4)]">
              Zingle
            </span>
          </Link>
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-3">

          {/* notifications */}
          <Link to={"/notifications"}>
            <button className="btn btn-ghost btn-circle hover:bg-emerald-500/10 transition-all">
              <BellIcon className="h-6 w-6 text-emerald-300 drop-shadow-[0_0_4px_rgba(0,255,135,0.4)]" />
            </button>
          </Link>

          {/* theme switch */}
          <ThemeSelector />

          {/* user avatar */}
          <div className="avatar cursor-pointer hover:ring hover:ring-emerald-400 hover:ring-offset-2 transition-all duration-300">
            <div className="w-9 rounded-full ring-emerald-400/50 ring-offset-base-100 ring-offset-1">
              <img src={authUser?.profilePic} alt="User" />
            </div>
          </div>

          {/* logout */}
          <button
            className="btn btn-ghost btn-circle hover:bg-red-500/10 transition-all"
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 text-red-400" />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
