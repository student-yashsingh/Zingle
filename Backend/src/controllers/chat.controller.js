import { generateStreamToken } from "../library/stream.js";

export async function getStreamToken(req, res) {
  try {
    //  Generate a chat access token for the current user
    const token = generateStreamToken(req.user.id);

    //  Send token to frontend (client)
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
