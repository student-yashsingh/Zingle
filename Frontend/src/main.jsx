// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "stream-chat-react/dist/css/v2/index.css";
// import "./index.css";
// import App from "./App.jsx";

// import { BrowserRouter } from "react-router";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </BrowserRouter>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";

const queryClient = new QueryClient();

const STREAM_KEY = import.meta.env.VITE_STREAM_API_KEY;
const client = StreamChat.getInstance(STREAM_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Chat client={client}>
          <App />
        </Chat>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
