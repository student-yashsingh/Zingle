import jwt from "jsonwebtoken";
import user from "../models/User.js"; 

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Unauthorized-No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(401).json({ message: "Unauthorized-Invalid token" });

        const foundUser = await user.findById(decoded.userId); 
        if (!foundUser) return res.status(401).json({ message: "Unauthorized-User not found" });

        req.user = foundUser; 
        next();
    } catch (error) {
        console.log('Error in the protectRoute middleware', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

