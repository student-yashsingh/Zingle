// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { BellIcon, HomeIcon, UsersIcon, Video } from "lucide-react";

// const Sidebar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();
//   const currentPath = location.pathname;

//   return (
//     <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
//       <div className="p-5 border-b border-base-300">
//         <Link to="/" className="flex items-center gap-2.5">
//           <Video className="size-9 text-primary" />
//           <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//             Zingle
//           </span>
//         </Link>
//       </div>

//       <nav className="flex-1 p-4 space-y-1">
//         <Link
//           to="/"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
//             currentPath === "/" ? "btn-active" : ""
//           }`}
//         >
//           <HomeIcon className="size-5 text-base-content opacity-70" />
//           <span>Home</span>
//         </Link>

//         <Link
//           to="/friends"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
//             currentPath === "/friends" ? "btn-active" : ""
//           }`}
//         >
//           <UsersIcon className="size-5 text-base-content opacity-70" />
//           <span>Friends</span>
//         </Link>

//         <Link
//           to="/notifications"
//           className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
//             currentPath === "/notifications" ? "btn-active" : ""
//           }`}
//         >
//           <BellIcon className="size-5 text-base-content opacity-70" />
//           <span>Notifications</span>
//         </Link>
//       </nav>

//       {/* USER PROFILE SECTION */}
//       <div className="p-4 border-t border-base-300 mt-auto">
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 rounded-full">
//               <img src={authUser?.profilePic} alt="User Avatar" />
//             </div>
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold text-sm">{authUser?.fullName}</p>
//             <p className="text-xs text-success flex items-center gap-1">
//               <span className="size-2 rounded-full bg-success inline-block" />
//               Online
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Sidebar;



import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, Video } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItemClass = (path) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
     ${currentPath === path
        ? "bg-[#0F1A17] border border-emerald-400/40 shadow-[0_0_18px_rgba(0,255,170,0.35)]"
        : "hover:bg-[#0E1312] border border-transparent hover:border-emerald-400/20"}`
  
  return (
    <aside className="w-64 bg-[#050807] border-r border-emerald-500/10 hidden lg:flex flex-col h-screen sticky top-0">
      
      {/* BRAND */}
      <div className="p-5 border-b border-emerald-500/10 flex items-center gap-3">
        <Video className="size-9 text-emerald-400 drop-shadow-[0_0_6px_rgba(0,255,170,0.7)]" />
        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-transparent bg-clip-text tracking-wider drop-shadow-[0_0_12px_rgba(255,0,255,0.4)]">
          Zingle
        </span>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-5 space-y-4 mt-2 text-white/90">
        
        <Link to="/" className={navItemClass("/")}>
          <HomeIcon className="size-5 text-emerald-300 group-hover:scale-105 transition" />
          <span className="tracking-wide">Home</span>
        </Link>

        <Link to="/friends" className={navItemClass("/friends")}>
          <UsersIcon className="size-5 text-emerald-300 group-hover:scale-105 transition" />
          <span className="tracking-wide">Friends</span>
        </Link>

        <Link to="/notifications" className={navItemClass("/notifications")}>
          <BellIcon className="size-5 text-emerald-300 group-hover:scale-105 transition" />
          <span className="tracking-wide">Notifications</span>
        </Link>

      </nav>

      {/* USER */}
      <div className="p-5 border-t border-emerald-500/10 bg-[#080D0C]">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 h-11 rounded-full ring ring-emerald-400/50 ring-offset-base-200 ring-offset-2">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-emerald-300 flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
