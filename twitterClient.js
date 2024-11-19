import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";

dotenv.config();

// Function to create Twitter client
const createTwitterClient = () => {
  try {
    return new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      accessSecret: process.env.ACCESS_SECRET,
    });
  } catch (error) {
    console.error("Error creating Twitter client:", error);
    throw error;
  }
};

// Function to create bearer client
const createBearerClient = () => {
  try {
    return new TwitterApi(process.env.BEARER_TOKEN);
  } catch (error) {
    console.error("Error creating bearer client:", error);
    throw error;
  }
};

// Create clients
const client = createTwitterClient();
const bearer = createBearerClient();

// Create read-write and read-only clients
const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

// Function to verify credentials
const verifyCredentials = async () => {
  try {
    const user = await twitterClient.v2.me();
    console.log("Twitter credentials verified successfully.");
    console.log("Logged in as:", user.data.username);
    return user;
  } catch (error) {
    console.error("Error verifying Twitter credentials:", error);
    throw error;
  }
};

export { twitterClient, twitterBearer, verifyCredentials };
