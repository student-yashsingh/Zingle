// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   StreamVideo,
//   StreamVideoClient,
//   StreamCall,
//   CallControls,
//   SpeakerLayout,
//   StreamTheme,
//   CallingState,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import toast from "react-hot-toast";
// import PageLoader from "../components/PageLoader";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const CallPage = () => {
//   const { id: callId } = useParams();
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [isConnecting, setIsConnecting] = useState(true);

//   const { authUser, isLoading } = useAuthUser();

//   const { data: tokenData } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser,
//   });

//   useEffect(() => {
//     const initCall = async () => {
//       if (!tokenData.token || !authUser || !callId) return;

//       try {
//         console.log("Initializing Stream video client...");

//         const user = {
//           id: authUser._id,
//           name: authUser.fullName,
//           image: authUser.profilePic,
//         };

//         const videoClient = new StreamVideoClient({
//           apiKey: STREAM_API_KEY,
//           user,
//           token: tokenData.token,
//         });

//         const callInstance = videoClient.call("default", callId);

//         await callInstance.join({ create: true });

//         console.log("Joined call successfully");

//         setClient(videoClient);
//         setCall(callInstance);
//       } catch (error) {
//         console.error("Error joining call:", error);
//         toast.error("Could not join the call. Please try again.");
//       } finally {
//         setIsConnecting(false);
//       }
//     };

//     initCall();
//   }, [tokenData, authUser, callId]);

//   if (isLoading || isConnecting) return <PageLoader />;

//   return (
//     <div className="h-screen flex flex-col items-center justify-center">
//       <div className="relative">
//         {client && call ? (
//           <StreamVideo client={client}>
//             <StreamCall call={call}>
//               <CallContent />
//             </StreamCall>
//           </StreamVideo>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p>Could not initialize call. Please refresh or try again later.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const CallContent = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();

//   const navigate = useNavigate();

//   if (callingState === CallingState.LEFT) return navigate("/");

//   return (
//     <StreamTheme>
//       <SpeakerLayout />
//       <CallControls />
//     </StreamTheme>
//   );
// };

// export default CallPage;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
import { Video } from "lucide-react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;
      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });
        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });
        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');

        .call-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: #020d1f;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Ambient orbs */
        .call-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .call-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(18,81,163,0.35) 0%, transparent 70%);
          top: -15%; left: -10%;
          animation: callOrbFloat 14s ease-in-out infinite;
        }
        .call-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(26,173,85,0.2) 0%, transparent 70%);
          bottom: -10%; right: -8%;
          animation: callOrbFloat 18s 3s ease-in-out infinite;
        }
        @keyframes callOrbFloat {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(30px,-20px); }
        }

        /* ── Top bar ── */
        .call-topbar {
          position: relative; z-index: 20;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 28px;
          background: rgba(8,9,14,0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(59,142,240,0.12);
          flex-shrink: 0;
        }
        .call-logo {
          display: flex; align-items: center; gap: 9px;
          text-decoration: none;
        }
        .call-logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #1a6fd4, #1aad55);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(26,111,212,0.4);
          flex-shrink: 0;
        }
        .call-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800;
          background: linear-gradient(90deg, #74b3f8, #5de68a, #74b3f8);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* live pill */
        .call-live-pill {
          display: flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 99px;
          background: rgba(26,173,85,0.12);
          border: 1px solid rgba(37,211,102,0.25);
          font-size: 12px; font-weight: 600; color: #5de68a;
        }
        .call-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #25d366;
          box-shadow: 0 0 8px #25d366;
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.5); }
        }

        /* call id chip */
        .call-id-chip {
          font-size: 11.5px; color: rgba(148,163,184,0.5);
          font-family: monospace;
        }

        /* ── Stream wrapper ── */
        .call-stream-wrap {
          flex: 1;
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
        }

        /* Override Stream SDK theme to match Zingle colors */
        .call-stream-wrap .str-video {
          background: transparent !important;
        }
        .call-stream-wrap .str-video__speaker-layout {
          background: transparent !important;
        }
        .call-stream-wrap .str-video__call-controls {
          background: rgba(8,9,14,0.75) !important;
          backdrop-filter: blur(16px) !important;
          border-top: 1px solid rgba(59,142,240,0.12) !important;
          padding: 14px 24px !important;
        }
        .call-stream-wrap .str-video__call-controls__button {
          background: rgba(255,255,255,0.06) !important;
          border: 1px solid rgba(59,142,240,0.2) !important;
          border-radius: 12px !important;
          transition: background 0.2s, transform 0.15s !important;
        }
        .call-stream-wrap .str-video__call-controls__button:hover {
          background: rgba(26,111,212,0.2) !important;
          transform: scale(1.06) !important;
        }
        /* End call button — red */
        .call-stream-wrap .str-video__call-controls__button--end-call {
          background: rgba(239,68,68,0.15) !important;
          border-color: rgba(239,68,68,0.3) !important;
        }
        .call-stream-wrap .str-video__call-controls__button--end-call:hover {
          background: rgba(239,68,68,0.3) !important;
        }
        /* Participant tile */
        .call-stream-wrap .str-video__participant-view {
          border-radius: 14px !important;
          border: 1px solid rgba(59,142,240,0.15) !important;
          overflow: hidden !important;
        }
        /* Participant name */
        .call-stream-wrap .str-video__participant-details {
          background: linear-gradient(transparent, rgba(2,13,31,0.85)) !important;
        }

        /* ── Error / no-call state ── */
        .call-error {
          flex: 1; display: flex;
          align-items: center; justify-content: center;
          flex-direction: column; gap: 16px;
          padding: 40px;
          position: relative; z-index: 10;
        }
        .call-error-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px;
        }
        .call-error h3 {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #eef2ff; margin: 0;
        }
        .call-error p {
          font-size: 14px; color: rgba(148,163,184,0.7);
          margin: 0; text-align: center; max-width: 340px; line-height: 1.6;
        }
        .call-error-btn {
          padding: 10px 24px; border-radius: 11px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #1a6fd4, #1aad55);
          color: #fff; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(26,111,212,0.35);
        }
        .call-error-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(26,111,212,0.45);
        }
      `}</style>

      <div className="call-root">
        {/* Ambient background */}
        <div className="call-orb call-orb-1" />
        <div className="call-orb call-orb-2" />

        {/* Top bar */}
        <div className="call-topbar">
          <div className="call-logo">
            <div className="call-logo-icon">
              <Video size={18} color="#fff" />
            </div>
            <span className="call-logo-text">Zingle</span>
          </div>

          <div className="call-live-pill">
            <div className="call-live-dot" />
            Live Call
          </div>

          <span className="call-id-chip">#{callId?.slice(-8)}</span>
        </div>

        {/* Stream content */}
        <div className="call-stream-wrap">
          {client && call ? (
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <CallContent />
              </StreamCall>
            </StreamVideo>
          ) : (
            <div className="call-error">
              <div className="call-error-icon">📵</div>
              <h3>Couldn't join the call</h3>
              <p>Something went wrong while connecting. Please refresh the page or try again.</p>
              <button className="call-error-btn" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
