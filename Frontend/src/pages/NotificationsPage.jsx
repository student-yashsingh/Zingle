// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { acceptFriendRequest, getFriendRequests } from "../lib/api";
// import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
// import NoNotificationsFound from "../components/NoNotificationsFound";

// const NotificationsPage = () => {
//   const queryClient = useQueryClient();

//   const { data: friendRequests, isLoading } = useQuery({
//     queryKey: ["friendRequests"],
//     queryFn: getFriendRequests,
//   });

//   const { mutate: acceptRequestMutation, isPending } = useMutation({
//     mutationFn: acceptFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
//       queryClient.invalidateQueries({ queryKey: ["friends"] });
//     },
//   });

//   const incomingRequests = friendRequests?.incomingReqs || [];
//   const acceptedRequests = friendRequests?.acceptedReqs || [];

//   return (
//     <div className="p-6 sm:p-8 bg-[#0f1111] text-white min-h-screen">
//       <div className="container mx-auto max-w-4xl space-y-10">

//         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-200">
//           Notifications 🔔
//         </h1>

//         {isLoading ? (
//           <div className="flex justify-center py-16">
//             <span className="loading loading-spinner loading-lg"></span>
//           </div>
//         ) : (
//           <>
//             {/* incoming */}
//             {incomingRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <UserCheckIcon className="h-5 w-5 text-emerald-400" />
//                   Friend Requests 
//                   <span className="badge bg-emerald-500 border-none text-black ml-2">
//                     {incomingRequests.length}
//                   </span>
//                 </h2>

//                 <div className="space-y-3">
//                   {incomingRequests.map((request) => (
//                     <div
//                       key={request._id}
//                       className="card bg-[#161919] border border-[#1e2222]"
//                     >
//                       <div className="card-body p-4 flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="avatar w-14 h-14 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
//                             <img src={request.sender.profilePic} alt={request.sender.fullName} />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold">{request.sender.fullName}</h3>
//                             <p className="text-xs opacity-70 mt-1">
//                               wants to connect with you on Zingle 💬
//                             </p>
//                           </div>
//                         </div>

//                         <button
//                           className="btn bg-emerald-500 border-none text-black hover:bg-emerald-400 btn-sm"
//                           onClick={() => acceptRequestMutation(request._id)}
//                           disabled={isPending}
//                         >
//                           Accept 
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* accepted */}
//             {acceptedRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <BellIcon className="h-5 w-5 text-green-400" />
//                   New Zingle Connections 💚
//                 </h2>

//                 <div className="space-y-3">
//                   {acceptedRequests.map((notification) => (
//                     <div key={notification._id} className="card bg-[#161919] border border-[#1e2222]">
//                       <div className="card-body p-4 flex items-center gap-3">
//                         <div className="avatar size-10 rounded-full">
//                           <img src={notification.recipient.profilePic} alt={notification.recipient.fullName} />
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold">{notification.recipient.fullName}</h3>
//                           <p className="text-sm opacity-80">
//                             just accepted your request — go talk! 😄
//                           </p>
//                           <p className="text-xs flex items-center opacity-50">
//                             <ClockIcon className="h-3 w-3 mr-1" />
//                             moments ago
//                           </p>
//                         </div>
//                         <div className="badge bg-green-500 border-none text-black">
//                           <MessageSquareIcon className="h-3 w-3 mr-1" />
//                           New Friend
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
//               <NoNotificationsFound />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, CheckIcon, Link } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { Link as RouterLink } from "react-router";
import "../zingle-theme.css";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const totalCount = incomingRequests.length + acceptedRequests.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap');

        .np-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: #020d1f;
          color: #eef2ff;
          padding: 40px 40px 80px;
          position: relative;
          overflow: hidden;
        }
        @media(max-width:640px){ .np-root { padding: 24px 16px 60px; } }

        /* subtle ambient orbs */
        .np-orb {
          position: fixed; border-radius: 50%;
          filter: blur(110px); pointer-events: none; z-index: 0;
        }
        .np-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(18,81,163,0.28) 0%, transparent 70%);
          top: -15%; left: -12%;
          animation: npFloat 16s ease-in-out infinite;
        }
        .np-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(26,173,85,0.18) 0%, transparent 70%);
          bottom: -10%; right: -8%;
          animation: npFloat 20s 4s ease-in-out infinite;
        }
        @keyframes npFloat {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(24px,-16px); }
        }

        /* ── Page header ── */
        .np-header {
          position: relative; z-index: 10;
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .np-title-row { display: flex; align-items: center; gap: 14px; }
        .np-title-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(26,111,212,0.25), rgba(26,173,85,0.2));
          border: 1px solid rgba(59,142,240,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .np-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 3vw, 30px);
          font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(90deg, #3b8ef0, #25d366);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin: 0 0 4px;
        }
        .np-title-sub {
          font-size: 13.5px; color: rgba(148,163,184,0.65);
          font-style: italic; margin: 0;
        }
        .np-count-badge {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 28px; height: 28px; padding: 0 9px;
          border-radius: 99px;
          background: linear-gradient(135deg, #1a6fd4, #1aad55);
          color: #fff; font-size: 13px; font-weight: 700;
          box-shadow: 0 2px 10px rgba(26,111,212,0.4);
          flex-shrink: 0;
        }

        /* ── Content container ── */
        .np-content {
          position: relative; z-index: 10;
          max-width: 760px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 40px;
        }

        /* ── Section ── */
        .np-section-head {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 18px;
        }
        .np-section-icon {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .np-section-icon-blue {
          background: rgba(26,111,212,0.15);
          border: 1px solid rgba(59,142,240,0.25);
        }
        .np-section-icon-green {
          background: rgba(26,173,85,0.12);
          border: 1px solid rgba(37,211,102,0.2);
        }
        .np-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 700;
          color: #eef2ff; margin: 0;
        }
        .np-section-count {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 22px; height: 22px; padding: 0 7px;
          border-radius: 99px;
          background: rgba(26,173,85,0.15);
          border: 1px solid rgba(37,211,102,0.25);
          color: #5de68a; font-size: 11.5px; font-weight: 700;
          margin-left: 4px;
        }

        /* ── Cards ── */
        .np-card {
          background: rgba(14,16,23,0.82);
          border: 1px solid rgba(59,142,240,0.12);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 16px;
          justify-content: space-between;
          backdrop-filter: blur(12px);
          transition: border-color 0.25s, transform 0.2s, box-shadow 0.25s;
          animation: fadeUp 0.4s ease both;
        }
        .np-card:hover {
          border-color: rgba(59,142,240,0.25);
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(2,13,31,0.5);
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .np-card-left { display: flex; align-items: center; gap: 14px; min-width: 0; }

        /* avatar */
        .np-avatar-wrap { position: relative; flex-shrink: 0; }
        .np-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(59,142,240,0.3);
        }
        .np-avatar-ring-green { border-color: rgba(37,211,102,0.45); }
        .np-avatar-status {
          position: absolute; bottom: 1px; right: 1px;
          width: 13px; height: 13px; border-radius: 50%;
          background: #25d366;
          border: 2px solid #020d1f;
          box-shadow: 0 0 6px #25d366;
        }

        .np-card-name {
          font-size: 15px; font-weight: 700;
          color: #eef2ff; margin: 0 0 4px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .np-card-sub {
          font-size: 13px; color: rgba(148,163,184,0.7);
          margin: 0; line-height: 1.5;
        }
        .np-card-time {
          display: flex; align-items: center; gap: 4px;
          font-size: 11.5px; color: rgba(90,106,136,0.6);
          margin-top: 4px;
        }

        /* ── Accept button ── */
        .np-accept-btn {
          height: 38px; padding: 0 20px;
          border: none; border-radius: 10px; cursor: pointer;
          background: linear-gradient(135deg, #1a6fd4, #1aad55);
          color: #fff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 700; white-space: nowrap;
          display: flex; align-items: center; gap: 7px;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 3px 14px rgba(26,111,212,0.35);
          flex-shrink: 0; position: relative; overflow: hidden;
        }
        .np-accept-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          pointer-events: none;
        }
        .np-accept-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 7px 22px rgba(26,111,212,0.45);
        }
        .np-accept-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── "New Friend" pill ── */
        .np-new-friend-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 99px;
          background: rgba(26,173,85,0.12);
          border: 1px solid rgba(37,211,102,0.25);
          color: #5de68a; font-size: 12px; font-weight: 600;
          white-space: nowrap; flex-shrink: 0;
        }

        /* ── Chat link ── */
        .np-chat-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 10px;
          background: rgba(26,111,212,0.1);
          border: 1px solid rgba(59,142,240,0.22);
          color: #74b3f8; font-size: 12.5px; font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .np-chat-link:hover {
          background: rgba(26,111,212,0.2);
          transform: translateY(-1px);
        }

        /* ── Divider between sections ── */
        .np-section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,142,240,0.15), transparent);
        }

        /* ── Spinner ── */
        .np-spinner {
          width: 36px; height: 36px;
          border: 3px solid rgba(59,142,240,0.15);
          border-top-color: #3b8ef0; border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 80px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* stagger cards */
        .np-card:nth-child(1) { animation-delay: 0s; }
        .np-card:nth-child(2) { animation-delay: 0.06s; }
        .np-card:nth-child(3) { animation-delay: 0.12s; }
        .np-card:nth-child(4) { animation-delay: 0.18s; }
        .np-card:nth-child(5) { animation-delay: 0.24s; }
      `}</style>

      <div className="np-root">
        {/* Ambient orbs */}
        <div className="np-orb np-orb-1" />
        <div className="np-orb np-orb-2" />

        {/* ── Header ── */}
        <div className="np-header" style={{ maxWidth: "760px", margin: "0 auto 40px" }}>
          <div className="np-title-row">
            <div className="np-title-icon">
              <BellIcon size={22} color="#74b3f8" />
            </div>
            <div>
              <h1 className="np-title">Notifications</h1>
              <p className="np-title-sub">Stay up to date with your connections</p>
            </div>
          </div>
          {totalCount > 0 && (
            <div className="np-count-badge">{totalCount}</div>
          )}
        </div>

        {/* ── Body ── */}
        {isLoading ? (
          <div className="np-spinner" />
        ) : (
          <div className="np-content">

            {/* Incoming requests */}
            {incomingRequests.length > 0 && (
              <section>
                <div className="np-section-head">
                  <div className="np-section-icon np-section-icon-blue">
                    <UserCheckIcon size={16} color="#74b3f8" />
                  </div>
                  <h2 className="np-section-title">
                    Friend Requests
                    <span className="np-section-count">{incomingRequests.length}</span>
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {incomingRequests.map((request) => (
                    <div key={request._id} className="np-card">
                      <div className="np-card-left">
                        <div className="np-avatar-wrap">
                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                            className="np-avatar np-avatar-ring-green"
                          />
                          <div className="np-avatar-status" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p className="np-card-name">{request.sender.fullName}</p>
                          <p className="np-card-sub">wants to connect with you on Zingle 💬</p>
                        </div>
                      </div>

                      <button
                        className="np-accept-btn"
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                      >
                        <CheckIcon size={14} />
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Divider between sections */}
            {incomingRequests.length > 0 && acceptedRequests.length > 0 && (
              <div className="np-section-divider" />
            )}

            {/* Accepted / new connections */}
            {acceptedRequests.length > 0 && (
              <section>
                <div className="np-section-head">
                  <div className="np-section-icon np-section-icon-green">
                    <BellIcon size={16} color="#5de68a" />
                  </div>
                  <h2 className="np-section-title">New Connections 💚</h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="np-card">
                      <div className="np-card-left">
                        <div className="np-avatar-wrap">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            className="np-avatar"
                          />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p className="np-card-name">{notification.recipient.fullName}</p>
                          <p className="np-card-sub">Accepted your friend request — say hello! 👋</p>
                          <div className="np-card-time">
                            <ClockIcon size={11} />
                            moments ago
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <div className="np-new-friend-pill">
                          <MessageSquareIcon size={12} />
                          New Friend
                        </div>
                        <RouterLink to={`/chat/${notification.recipient._id}`} className="np-chat-link">
                          Chat →
                        </RouterLink>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}

          </div>
        )}
      </div>
    </>
  );
};

export default NotificationsPage;
