// // src/pages/HomePage.jsx
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
// import FriendCard from "../components/FriendCard";
// import { getLanguageFlag } from "../constants";
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
//     <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#0f1111] via-[#111313] to-[#131717] min-h-screen text-white">
//       <div className="container mx-auto space-y-10">

//         {/* FRIENDS HEADER */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-200 tracking-tight">
//             Your Zingle Circle 🤝
//           </h2>

//           <Link
//             to="/notifications"
//             className="btn btn-outline btn-sm border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-black"
//           >
//             <UsersIcon className="mr-2 size-4" />
//             Requests
//           </Link>
//         </div>

//         {/* FRIENDS LIST */}
//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <div className="opacity-90">
//             <NoFriendsFound />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         {/* RECOMMENDATIONS */}
//         <section>
//           <div className="mb-6 sm:mb-8">
//             <h2 className="text-2xl font-semibold tracking-tight">
//               Meet New Learners 🌍
//             </h2>
//             <p className="opacity-60 text-sm">
//               perfect language partners — Indians + world wide!
//             </p>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">No recommendations right now 🙃</h3>
//               <p className="text-base-content opacity-70">
//                 check again in some time yaar
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-[#161919] border border-[#1e2222] hover:shadow-[0_0_20px_rgba(0,255,135,0.25)] transition-all duration-300 rounded-xl"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       {/* User Info */}
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full ring ring-emerald-400 ring-offset-base-100 ring-offset-2">
//                           <img src={user.profilePic} alt={user.fullName} />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg text-emerald-200">
//                             {user.fullName}
//                           </h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* LANG BADGES */}
//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-success badge-outline border-emerald-300">
//                         <img
//   src={getLanguageFlag(user.nativeLanguage)}
//   alt=""
//   className="h-3 w-4 mr-1 inline-block"
// />
// Native: {capitialize(user.nativeLanguage)}

//                         </span>
//                         <span className="badge badge-outline border-emerald-700 text-emerald-300">
//                         <img
//   src={getLanguageFlag(user.learningLanguage)}
//   alt=""
//   className="h-3 w-4 mr-1 inline-block"
// />
// Learning: {capitialize(user.learningLanguage)}

//                         </span>
//                       </div>

//                       {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

//                       {/* BUTTON */}
//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent
//                             ? "btn-disabled"
//                             : "btn bg-emerald-500 border-none text-black hover:bg-emerald-400"
//                         } `}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent 👍
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Connect Now 💬
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
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, SearchIcon, SparklesIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import FriendCard from "../components/FriendCard";
import { getLanguageFlag } from "../constants";
import NoFriendsFound from "../components/NoFriendsFound";
import "../zingle-theme.css";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [search, setSearch] = useState("");

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
    if (outgoingFriendReqs?.length > 0) {
      outgoingFriendReqs.forEach((req) => outgoingIds.add(req.recipient._id));
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const filteredUsers = recommendedUsers.filter((u) =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.nativeLanguage?.toLowerCase().includes(search.toLowerCase()) ||
    u.learningLanguage?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap');

        .hp-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: #020d1f;
          color: #eef2ff;
          padding: 32px 40px 60px;
        }
        @media(max-width:640px){ .hp-root { padding: 20px 16px 48px; } }

        /* ── Section heading ── */
        .hp-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .hp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 800;
          letter-spacing: -0.4px;
          margin: 0;
        }
        .hp-title-gradient {
          background: linear-gradient(90deg, #3b8ef0, #25d366);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hp-subtitle {
          font-size: 13.5px;
          color: rgba(148,163,184,0.7);
          margin: 4px 0 0;
          font-style: italic;
        }

        /* ── Requests button ── */
        .hp-req-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 18px; border-radius: 10px;
          background: rgba(26,111,212,0.12);
          border: 1px solid rgba(59,142,240,0.28);
          color: #74b3f8; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .hp-req-btn:hover {
          background: rgba(26,111,212,0.22);
          transform: translateY(-1px);
        }

        /* ── Friends grid ── */
        .hp-friends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        /* ── Divider ── */
        .hp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,142,240,0.18), transparent);
          margin: 48px 0;
        }

        /* ── Search bar ── */
        .hp-search-wrap {
          position: relative;
          max-width: 320px;
        }
        .hp-search-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: rgba(90,106,136,0.7); pointer-events: none;
        }
        .hp-search {
          width: 100%; height: 40px;
          padding: 0 14px 0 38px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(59,142,240,0.18);
          border-radius: 10px;
          color: #eef2ff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .hp-search::placeholder { color: rgba(90,106,136,0.6); }
        .hp-search:focus {
          border-color: rgba(59,142,240,0.5);
          box-shadow: 0 0 0 3px rgba(26,111,212,0.1);
        }

        /* ── Recommended user card ── */
        .hp-user-card {
          background: rgba(14,16,23,0.82);
          border: 1px solid rgba(59,142,240,0.12);
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          backdrop-filter: blur(12px);
        }
        .hp-user-card:hover {
          border-color: rgba(37,211,102,0.3);
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(2,13,31,0.6), 0 0 24px rgba(26,173,85,0.1);
        }

        /* avatar */
        .hp-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(59,142,240,0.35);
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .hp-user-card:hover .hp-avatar { border-color: rgba(37,211,102,0.5); }

        .hp-user-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #eef2ff; margin: 0 0 3px;
        }
        .hp-user-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: rgba(148,163,184,0.65);
        }

        /* lang badges */
        .hp-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 99px;
          font-size: 11.5px; font-weight: 600;
        }
        .hp-badge-native {
          background: rgba(26,111,212,0.14);
          border: 1px solid rgba(59,142,240,0.22);
          color: #74b3f8;
        }
        .hp-badge-learning {
          background: rgba(26,173,85,0.1);
          border: 1px solid rgba(37,211,102,0.2);
          color: #5de68a;
        }

        .hp-bio {
          font-size: 13px;
          color: rgba(148,163,184,0.7);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* connect button */
        .hp-connect-btn {
          width: 100%; height: 42px; border: none; border-radius: 11px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          position: relative; overflow: hidden;
        }
        .hp-connect-btn-active {
          background: linear-gradient(135deg, #1a6fd4, #1aad55);
          color: #fff;
          box-shadow: 0 4px 16px rgba(26,111,212,0.35);
        }
        .hp-connect-btn-active::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          pointer-events: none;
        }
        .hp-connect-btn-active:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(26,111,212,0.45);
        }
        .hp-connect-btn-sent {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(37,211,102,0.25);
          color: #5de68a;
          cursor: default;
        }
        .hp-connect-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Recommended grid ── */
        .hp-rec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        /* ── Empty state ── */
        .hp-empty {
          padding: 48px 24px;
          text-align: center;
          border-radius: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(59,142,240,0.1);
        }
        .hp-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 700; margin: 0 0 8px;
          color: #eef2ff;
        }
        .hp-empty p { font-size: 13.5px; color: rgba(148,163,184,0.65); margin: 0; }

        /* ── Spinner ── */
        .hp-spinner {
          width: 36px; height: 36px;
          border: 3px solid rgba(59,142,240,0.15);
          border-top-color: #3b8ef0;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 48px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Sparkle count pill ── */
        .hp-count-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 99px;
          background: rgba(26,173,85,0.1);
          border: 1px solid rgba(37,211,102,0.2);
          font-size: 12px; font-weight: 600; color: #5de68a;
        }
      `}</style>

      <div className="hp-root">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* ── Friends Section ── */}
          <div className="hp-section-head">
            <div>
              <h2 className="hp-section-title">
                <span className="hp-title-gradient">Your Zingle Circle</span> 🤝
              </h2>
              <p className="hp-subtitle">People you're already connected with</p>
            </div>
            <Link to="/notifications" className="hp-req-btn">
              <UsersIcon size={15} />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="hp-spinner" />
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="hp-friends-grid">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}

          <div className="hp-divider" />

          {/* ── Recommended Section ── */}
          <div className="hp-section-head">
            <div>
              <h2 className="hp-section-title">
                Meet New Learners 🌍
              </h2>
              <p className="hp-subtitle">
                Handpicked language partners — Indians + worldwide
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {!loadingUsers && filteredUsers.length > 0 && (
                <div className="hp-count-pill">
                  <SparklesIcon size={11} />
                  {filteredUsers.length} partners found
                </div>
              )}
              {/* Search */}
              <div className="hp-search-wrap">
                <SearchIcon size={15} className="hp-search-icon" />
                <input
                  type="text"
                  className="hp-search"
                  placeholder="Search by name or language…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="hp-spinner" />
          ) : filteredUsers.length === 0 ? (
            <div className="hp-empty">
              <h3>{search ? "No results found" : "No recommendations right now"}</h3>
              <p>{search ? `No one matched "${search}" — try another search.` : "Check back in a bit, new learners join every day!"}</p>
            </div>
          ) : (
            <div className="hp-rec-grid">
              {filteredUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                return (
                  <div key={user._id} className="hp-user-card">
                    {/* User info row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="hp-avatar"
                      />
                      <div style={{ minWidth: 0 }}>
                        <p className="hp-user-name">{user.fullName}</p>
                        {user.location && (
                          <div className="hp-user-loc">
                            <MapPinIcon size={11} />
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      <span className="hp-badge hp-badge-native">
                        <img src={getLanguageFlag(user.nativeLanguage)} alt="" style={{ height: "11px", width: "16px", borderRadius: "2px" }} />
                        {capitialize(user.nativeLanguage)}
                      </span>
                      <span style={{ fontSize: "11px", color: "rgba(90,106,136,0.6)", alignSelf: "center" }}>→ learning</span>
                      <span className="hp-badge hp-badge-learning">
                        <img src={getLanguageFlag(user.learningLanguage)} alt="" style={{ height: "11px", width: "16px", borderRadius: "2px" }} />
                        {capitialize(user.learningLanguage)}
                      </span>
                    </div>

                    {/* Bio */}
                    {user.bio && <p className="hp-bio">{user.bio}</p>}

                    {/* Connect button */}
                    <button
                      className={`hp-connect-btn ${hasRequestBeenSent ? "hp-connect-btn-sent" : "hp-connect-btn-active"}`}
                      onClick={() => !hasRequestBeenSent && sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isPending}
                    >
                      {hasRequestBeenSent ? (
                        <><CheckCircleIcon size={15} /> Request Sent</>
                      ) : (
                        <><UserPlusIcon size={15} /> Connect Now</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default HomePage;
