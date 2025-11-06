
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { upsertStreamUser } from "../library/stream.js";
// import user from "../models/User.js";

// // SIGNUP
// export async function signup(req, res) {
//   const { fullName, Email, Password } = req.body;

//   try {
//     // 1. Required fields check
//     if (!fullName || !Email || !Password) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     // 2. Name validation
//     const NameRegex = /^[A-Za-z_][A-Za-z0-9_ ]*$/;
//     if (!NameRegex.test(fullName)) {
//       return res.status(400).json({
//         message:
//           "Re-enter the name (leading digits are not allowed and no special characters except underscore).",
//       });
//     }

//     // 3. Password validation
//     if (Password.length < 8) {
//       return res.status(400).json({ message: "Password must be at least 8 characters" });
//     }

//     // 4. Email validation
//     const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!EmailRegex.test(Email)) {
//       return res.status(400).json({ message: "Invalid Email" });
//     }

//     // 5. Check existing email
//     const existingEmail = await User.findOne({ email: Email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "User with this email already exists." });
//     }

//     // 6. Random avatar
//     const indx = Math.floor(Math.random() * 100) + 1;
//     const avatar = `https://avatar.iran.liara.run/public/${indx}.png`;

//     // 7. Password hashing
//     const hashedPassword = await bcrypt.hash(Password, 10);

//     // 8. Create new user with hashed password
//     const newUser = await User.create({
//       fullName,
//       email: Email,
//       password: hashedPassword,  // Save the hashed password
//       profilePic: avatar,
//     });

//     try{
//       await upsertStreamUser({
//         id: newUser._id.toString(),
//         name: newUser.fullName,
//         image: newUser.profilePic || "",
//       });
//       console.log(`Stream User Created for ${newUser.fullName}`);
//     }catch(error){
//       console.log("Error in creating the Stream User:",error);
//     }


//     // 9. Generate JWT token
//     const token = jwt.sign(
//       { userId: newUser._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     // 10. Store JWT token in cookie
//     res.cookie("jwt", token, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,  // Cookie expiration (7 days)
//       httpOnly: true,  // Prevent XSS attacks
//       sameSite: "strict",  // Prevent CSRF attacks
//       secure: process.env.NODE_ENV === "production",  // Set secure flag only in production
//     });

//     // 11. Send successful response with new user data
//     res.status(201).json({ success: true, user: newUser });

//   } catch (error) {
//     console.error("Signup Error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

// // LOGIN
// export async function login(req, res) {
//   try {
//     const { Email, Password } = req.body;

//     // 1. Check if email and password are provided
//     if (!Email || !Password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 2. Check if user exists
//     const user = await User.findOne({ email: Email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     // 3. Check if password matches
//     const isPasswordCorrect = await bcrypt.compare(Password, user.password);  // Using bcrypt.compare to validate password
//     if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

//     // 4. Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "7d" }
//     );

//     // 5. Store JWT token in cookie
//     res.cookie("jwt", token, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,  // Cookie expiration (7 days)
//       httpOnly: true,  // Prevent XSS attacks
//       sameSite: "strict",  // Prevent CSRF attacks
//       secure: process.env.NODE_ENV === "production",  // Set secure flag only in production
//     });

//     // 6. Send successful response with user data
//     res.status(200).json({ success: true, user });

//   } catch (error) {
//     console.error("Error in login controller:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// // LOGOUT
// export function logout(req, res) {
//   // 1. Clear the JWT cookie on logout
//   res.clearCookie("jwt");
//   res.status(200).json({ success: true, message: "Logout successful" });
// }



// // ONBOARDING PAGE
// export async function onboard(req,res){
//   try{
//     const userId=req.user._id
//     const {fullName,bio,nativeLanguage,learningLanguage,location}=req.body;
//     if(!fullName|| !bio || !nativeLanguage || !learningLanguage || !location){
//       return res.status(400).json({
//         message:"All fields are required",
//         missingFields:[
//           !fullName && "fullName",
//           !bio && "bio",
//           !nativeLanguage && "nativeLanguage",
//           !learningLanguage && "learningLanguage",
//           !location && "location"
//         ].filter(Boolean)
//       });
//     }
//     const updatedUser=await user.findByIdAndUpdate(userId,{
//       ...req.body,
//       isOnboarded:true
//     },{new:true})
//     if(!updatedUser)return res.status(404).json({
//       message:"User not found"
//     });
//     try{
//       await upsertStreamUser({
//         id:updatedUser._id.toString(),
//         name:updatedUser.fullName,
//         image:updatedUser.profilePic || ""
//       })
//       console.log(`Stream user updating after onboarding for ${updatedUser.fullName}`);
//     }catch(error){
//       console.log("Error in updating the user during onboarding:",error.message);
//     }
//     res.status(200).json({success:true,user:updatedUser});
//   }
//   catch(error){
//     console.error("Onboarding error:",error);
//     res.status(500).json({
//       message:"Internal Server Error"
//     });
//   }
// }


// Backend/src/controllers/auth.controller.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { upsertStreamUser } from "../library/stream.js";

const isProd = process.env.NODE_ENV === "production";

function setAuthCookie(res, token) {
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: isProd ? "strict" : "none", // dev requires "none" for cross-site cookies
    secure: isProd,                       // false on localhost
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

// SIGNUP
export async function signup(req, res) {
  // accept both lowercase and old capitalized keys
  const fullName = req.body.fullName;
  const email = req.body.email ?? req.body.Email;
  const password = req.body.password ?? req.body.Password;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const NameRegex = /^[A-Za-z_][A-Za-z0-9_ ]*$/;
    if (!NameRegex.test(fullName)) {
      return res.status(400).json({
        message:
          "Re-enter the name (leading digits are not allowed and no special characters except underscore).",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EmailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: avatar,
    });

    // best-effort Stream user
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
    } catch (e) {
      console.log("Stream user create error:", e?.message);
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    setAuthCookie(res, token);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const email = req.body.email ?? req.body.Email;
    const password = req.body.password ?? req.body.Password;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    setAuthCookie(res, token);

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// LOGOUT
export function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: isProd ? "strict" : "none",
    secure: isProd,
  });
  res.status(200).json({ success: true, message: "Logout successful" });
}

// ONBOARDING
export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location, profilePic } = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        ...(profilePic ? { profilePic } : {}),
        isOnboarded: true,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
    } catch (e) {
      console.log("Stream user update error:", e?.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
