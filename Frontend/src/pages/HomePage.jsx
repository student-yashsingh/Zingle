// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router";
// import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

// import { capitialize } from "../lib/utils";

// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   const { data: outgoingFriendReqs } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
//   });

//   useEffect(() => {
//     const outgoingIds = new Set();
//     if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
//       outgoingFriendReqs.forEach((req) => {
//         outgoingIds.add(req.recipient._id);
//       });
//       setOutgoingRequestsIds(outgoingIds);
//     }
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">{user.fullName}</h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Languages with flags */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

//                       {/* Action button */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         } `}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// src/pages/HomePage.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard from "../components/FriendCard";
import { getLanguageFlag } from "../constants";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#0f1111] via-[#111313] to-[#131717] min-h-screen text-white">
      <div className="container mx-auto space-y-10">

        {/* FRIENDS HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-200 tracking-tight">
            Your Zingle Circle 🤝
          </h2>

          <Link
            to="/notifications"
            className="btn btn-outline btn-sm border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-black"
          >
            <UsersIcon className="mr-2 size-4" />
            Requests
          </Link>
        </div>

        {/* FRIENDS LIST */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <div className="opacity-90">
            <NoFriendsFound />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* RECOMMENDATIONS */}
        <section>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Meet New Learners 🌍
            </h2>
            <p className="opacity-60 text-sm">
              perfect language partners — Indians + world wide!
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations right now 🙃</h3>
              <p className="text-base-content opacity-70">
                check again in some time yaar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-[#161919] border border-[#1e2222] hover:shadow-[0_0_20px_rgba(0,255,135,0.25)] transition-all duration-300 rounded-xl"
                  >
                    <div className="card-body p-5 space-y-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full ring ring-emerald-400 ring-offset-base-100 ring-offset-2">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg text-emerald-200">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* LANG BADGES */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-success badge-outline border-emerald-300">
                        <img
  src={getLanguageFlag(user.nativeLanguage)}
  alt=""
  className="h-3 w-4 mr-1 inline-block"
/>
Native: {capitialize(user.nativeLanguage)}

                        </span>
                        <span className="badge badge-outline border-emerald-700 text-emerald-300">
                        <img
  src={getLanguageFlag(user.learningLanguage)}
  alt=""
  className="h-3 w-4 mr-1 inline-block"
/>
Learning: {capitialize(user.learningLanguage)}

                        </span>
                      </div>

                      {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                      {/* BUTTON */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent
                            ? "btn-disabled"
                            : "btn bg-emerald-500 border-none text-black hover:bg-emerald-400"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent 👍
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Connect Now 💬
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
