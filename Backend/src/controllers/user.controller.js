import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const _user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(_user.friends);
  } catch (error) {
    console.error("Error in getMyFriends Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res.status(400).json({
        message: "You can't send friend request to yourself",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this person" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this person",
      });
    }

    const newRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
    try {
      const { id: requestId } = req.params; // friend request id
      const friendRequest = await FriendRequest.findById(requestId);
  
      // If no request found
      if (!friendRequest) {
        return res.status(404).json({ message: "Friend request not found" });
      }
  
      // Verify that current user is the recipient
      if (friendRequest.recipient.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to accept this request" });
      }
  
      // request status ko update kar do aab
      friendRequest.status = "accepted";
      await friendRequest.save(); // <-- this line updates the DB
  
      // ek dusre ko add karo as friends
      await User.findByIdAndUpdate(friendRequest.sender, {
        $push: { friends: friendRequest.recipient },
      });
      await User.findByIdAndUpdate(friendRequest.recipient, {
        $push: { friends: friendRequest.sender },
      });
  
      res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
      console.error("Error in acceptFriendRequest controller:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


export async function getFriendRequests(req,res){
    try{
        const incomingReqs= await FriendRequest.find({
            recipient: req.user.id,
            status:"pending"
        }).populate("sender","fullName,profilePic nativeLanguage learningLanguage")

        const acceptedReqs= await FriendRequest.find({
            recipient: req.user.id,
            status:"accepted"
        }).populate("recipient","fullName,profilePic");

        res.status(200).json({
            incomingReqs,acceptedReqs
        });
    }catch(error){
        console.error("Error in getPendingRequests controller",error.message);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
}




export async function getOutgoingFriendReqs(req, res) {
  try {
    
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    })
      .populate(
        "recipient", 
        "fullName profilePic nativeLanguage learningLanguage"
      );

    
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
