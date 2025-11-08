// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
// import axios from "../lib/axios.js";

// const FriendsPage = () => {
//   const navigate = useNavigate();

//   const { data: friends, isLoading } = useQuery({
//     queryKey: ["myFriends"],
//     queryFn: async () => {
//       const res = await axios.get("/users/friends");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="h-full flex items-center justify-center text-gray-300">
//         Loading friends...
//       </div>
//     );
//   }

//   if (!friends || friends.length === 0) {
//     return (
//       <div className="h-full flex flex-col items-center justify-center text-gray-400">
//         <h2 className="text-xl font-semibold">No friends yet 😔</h2>
//         <p>Send requests to start your Zingle circle!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-white mb-6">
//         Your Friends 👥
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {friends.map((f) => (
//           <div
//             key={f._id}
//             className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex items-center gap-4 shadow-lg"
//           >
//             <img
//               src={f.profilePic}
//               className="w-14 h-14 rounded-full border border-green-500"
//               alt=""
//             />
//             <div className="flex-1">
//               <h3 className="text-white font-semibold">{f.fullName}</h3>

//               <button
//                 onClick={() => navigate(`/chat/${f._id}`)}
//                 className="mt-2 text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white"
//               >
//                 Message 💬
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FriendsPage;


// src/pages/FriendsPage.jsx
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { MessageCircle, UserRoundPlus } from "lucide-react";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-6 bg-gradient-to-br from-[#0f1111] via-[#111313] to-[#131717] min-h-screen text-white">
      <div className="container mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-200 tracking-tight">
            Apni Zingle Family ❤️
          </h2>

          <Link
            to="/"
            className="btn btn-outline border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-black"
          >
            <UserRoundPlus className="mr-2 size-4" />
            Add More Friends
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center opacity-80 py-16">
            <h3 className="text-xl font-semibold mb-2">
              Abhi koi dost nahi hai ☹️
            </h3>
            <p className="opacity-70">
              Home page pe jao, language partner dhoondo, aur connect karo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="p-5 rounded-xl border border-[#1e2222] bg-[#161919] hover:shadow-[0_0_18px_rgba(0,255,135,0.25)] transition-all duration-300 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar size-14 rounded-full ring ring-emerald-400 ring-offset-base-100 ring-offset-2">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                  <h3 className="font-semibold text-emerald-200 text-lg truncate">
                    {friend.fullName}
                  </h3>
                </div>

                <Link
                  to={`/chat/${friend._id}`}
                  className="btn bg-emerald-500 w-full text-black hover:bg-emerald-400"
                >
                  <MessageCircle className="size-4 mr-2" />
                  Chat Now 💬
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
