import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey=process.env.api_key
const apiSecret =process.env.api_secret

if(!apiKey || !apiSecret){
    console.error("Stream API Key or Secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret); 

export const upsertStreamUser=async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData
    }catch(error){
        console.error("Error upserting Stream user:",error);
    }
};


// todo:do it later

export const generateStreamToken=(userId)=>{};