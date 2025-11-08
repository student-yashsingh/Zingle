// import { StreamChat } from "stream-chat";

// const apiKey = process.env.STREAM_API_KEY;
// const apiSecret = process.env.STREAM_API_SECRET;

// let serverClient = null;

// if(apiKey && apiSecret){
//     serverClient = StreamChat.getInstance(apiKey);
//     console.log("Stream Enabled ");
// }else{
//     console.log("STREAM disabled  (missing creds)");
// }

// // create / login / update stream user
// export const upsertStreamUser = async (userData)=>{
//     if(!serverClient) return;
//     try{
//         await serverClient.upsertUser(userData);
//     }catch(err){
//         console.log("Stream upsert user error:", err.message);
//     }
// }

// // generate token
// export const generateStreamToken = (userId)=>{
//     if(!serverClient) return null;
//     try{
//         return serverClient.createToken(userId.toString(), apiSecret);
//     }catch(err){
//         console.log("Stream token error:", err.message);
//         return null;
//     }
// }



import dotenv from "dotenv";
import path from "path";
import { StreamChat } from "stream-chat";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

let streamClient = null;

if (apiKey && apiSecret) {
  streamClient = StreamChat.getInstance(apiKey, apiSecret);
  console.log("STREAM ENABLED ");
} else {
  console.log("STREAM DISABLED  (missing creds)");
}

export const upsertStreamUser = async (userData) => {
  if (!streamClient) return;
  try {
    await streamClient.upsertUsers([userData]);
  } catch (error) {
    console.warn("Error upserting Stream user:", error.message);
  }
};

export const generateStreamToken = (userId) => {
  if (!streamClient) return null;
  try {
    return streamClient.createToken(userId.toString());
  } catch (e) {
    console.warn("⚠️ generateStreamToken failed:", e?.message);
    return null;
  }
};
