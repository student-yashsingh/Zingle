import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

let streamClient = null;

if (apiKey && apiSecret) {
  streamClient = StreamChat.getInstance(apiKey, apiSecret);
  console.log("Stream enabled");
} else {
  console.log("Stream disabled (no creds)");
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
