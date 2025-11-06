// import { axiosInstance } from "./axios";

// export const signup = async (signupData) => {
//   const response = await axiosInstance.post("/auth/signup", signupData);
//   return response.data;
// };

// export const login = async (loginData) => {
//   const response = await axiosInstance.post("/auth/login", loginData);
//   return response.data;
// };
// export const logout = async () => {
//   const response = await axiosInstance.post("/auth/logout");
//   return response.data;
// };

// export const getAuthUser = async () => {
//   try {
//     const res = await axiosInstance.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     console.log("Error in getAuthUser:", error);
//     return null;
//   }
// };

// export const completeOnboarding = async (userData) => {
//   const response = await axiosInstance.post("/auth/onboarding", userData);
//   return response.data;
// };

// export async function getUserFriends() {
//   const response = await axiosInstance.get("/users/friends");
//   return response.data;
// }

// export async function getRecommendedUsers() {
//   const response = await axiosInstance.get("/users");
//   return response.data;
// }

// export async function getOutgoingFriendReqs() {
//   const response = await axiosInstance.get("/users/outgoing-friend-requests");
//   return response.data;
// }

// export async function sendFriendRequest(userId) {
//   const response = await axiosInstance.post(`/users/friend-request/${userId}`);
//   return response.data;
// }

// export async function getFriendRequests() {
//   const response = await axiosInstance.get("/users/friend-requests");
//   return response.data;
// }

// export async function acceptFriendRequest(requestId) {
//   const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
//   return response.data;
// }

// export async function getStreamToken() {
//   const response = await axiosInstance.get("/chat/token");
//   return response.data;
// }







import { axiosInstance } from "./axios";

/* --- AUTH --- */
export const signup = async ({ fullName, email, password }) => {
  const payload = {
    fullName: String(fullName ?? "").trim(),
    email: String(email ?? "").trim(),      // lowercase (backend accepts both)
    password: String(password ?? "").trim() // lowercase (backend accepts both)
  };
  const res = await axiosInstance.post("/auth/signup", payload);
  return res.data;
};

export const login = async ({ email, password }) => {
  const payload = {
    email: String(email ?? "").trim(),
    password: String(password ?? "").trim(),
  };
  const res = await axiosInstance.post("/auth/login", payload);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data; // { user: {...} } or null if 401
  } catch (err) {
    console.log("Error in getAuthUser:", err);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

/* ---- other endpoints (unchanged) ---- */
export async function getUserFriends() {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
}
export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  return res.data;
}
export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
}
export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}
export async function getFriendRequests() {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
}
export async function acceptFriendRequest(requestId) {
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return res.data;
}
export async function getStreamToken() {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
}
