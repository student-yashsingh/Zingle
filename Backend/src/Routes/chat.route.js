// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { getStreamToken } from "../controllers/chat.controller.js";

// const router = express.Router();

// router.get("/token", protectRoute, getStreamToken);

// export default router;


import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

const router = express.Router();


router.get("/token", protectRoute, getStreamToken);


router.get("/sync-users", protectRoute, async (req, res) => {
  try {
    const users = await User.find({});

    for (const u of users) {
      await upsertStreamUser({
        id: u._id.toString(),
        name: u.fullName,
        image: u.profilePic || "",
      });
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
