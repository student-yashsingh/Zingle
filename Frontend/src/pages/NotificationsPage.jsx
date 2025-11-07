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
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto max-w-4xl space-y-8">
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg"></span>
//           </div>
//         ) : (
//           <>
//             {incomingRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <UserCheckIcon className="h-5 w-5 text-primary" />
//                   Friend Requests
//                   <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
//                 </h2>

//                 <div className="space-y-3">
//                   {incomingRequests.map((request) => (
//                     <div
//                       key={request._id}
//                       className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div className="card-body p-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="avatar w-14 h-14 rounded-full bg-base-300">
//                               <img src={request.sender.profilePic} alt={request.sender.fullName} />
//                             </div>
//                             <div>
//                               <h3 className="font-semibold">{request.sender.fullName}</h3>
//                               <div className="flex flex-wrap gap-1.5 mt-1">
//                                 <span className="badge badge-secondary badge-sm">
//                                   Native: {request.sender.nativeLanguage}
//                                 </span>
//                                 <span className="badge badge-outline badge-sm">
//                                   Learning: {request.sender.learningLanguage}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <button
//                             className="btn btn-primary btn-sm"
//                             onClick={() => acceptRequestMutation(request._id)}
//                             disabled={isPending}
//                           >
//                             Accept
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* ACCEPTED REQS NOTIFICATONS */}
//             {acceptedRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <BellIcon className="h-5 w-5 text-success" />
//                   New Connections
//                 </h2>

//                 <div className="space-y-3">
//                   {acceptedRequests.map((notification) => (
//                     <div key={notification._id} className="card bg-base-200 shadow-sm">
//                       <div className="card-body p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="avatar mt-1 size-10 rounded-full">
//                             <img
//                               src={notification.recipient.profilePic}
//                               alt={notification.recipient.fullName}
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-semibold">{notification.recipient.fullName}</h3>
//                             <p className="text-sm my-1">
//                               {notification.recipient.fullName} accepted your friend request
//                             </p>
//                             <p className="text-xs flex items-center opacity-70">
//                               <ClockIcon className="h-3 w-3 mr-1" />
//                               Recently
//                             </p>
//                           </div>
//                           <div className="badge badge-success">
//                             <MessageSquareIcon className="h-3 w-3 mr-1" />
//                             New Friend
//                           </div>
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
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

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

  return (
    <div className="p-6 sm:p-8 bg-[#0f1111] text-white min-h-screen">
      <div className="container mx-auto max-w-4xl space-y-10">

        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-200">
          Notifications 🔔
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* incoming */}
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="h-5 w-5 text-emerald-400" />
                  Friend Requests 
                  <span className="badge bg-emerald-500 border-none text-black ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-[#161919] border border-[#1e2222]"
                    >
                      <div className="card-body p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar w-14 h-14 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
                            <img src={request.sender.profilePic} alt={request.sender.fullName} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{request.sender.fullName}</h3>
                            <p className="text-xs opacity-70 mt-1">
                              wants to connect with you on Zingle 💬
                            </p>
                          </div>
                        </div>

                        <button
                          className="btn bg-emerald-500 border-none text-black hover:bg-emerald-400 btn-sm"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          Accept 
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* accepted */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-green-400" />
                  New Zingle Connections 💚
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-[#161919] border border-[#1e2222]">
                      <div className="card-body p-4 flex items-center gap-3">
                        <div className="avatar size-10 rounded-full">
                          <img src={notification.recipient.profilePic} alt={notification.recipient.fullName} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{notification.recipient.fullName}</h3>
                          <p className="text-sm opacity-80">
                            just accepted your request — go talk! 😄
                          </p>
                          <p className="text-xs flex items-center opacity-50">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            moments ago
                          </p>
                        </div>
                        <div className="badge bg-green-500 border-none text-black">
                          <MessageSquareIcon className="h-3 w-3 mr-1" />
                          New Friend
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
