## Step 1: Install Node
I am assuming that if you are at the level of making Twitter Bots, you have Node installed. If not, you will need to install it.

If you are not sure if you have Node installed, simply run

node -v
It should say something like

v16.14.2
## Step 2: Create a new node app and install dependencies
Let's go ahead a create a new Node.js app with

npm init -y
This will create our package.json file for us. We will now add all the packages we will need for our bot.

npm install twitter-api-v2
npm install dotenv
npm install cron
npm install express
## Step 3: Create an .env file and load in your API keys
Create a file called .env. This is where the API keys and tokens we generate will go.

Here is an example of a .env file. Replace the values with your values you created on the Twitter developer platform.

.env
NODE_ENV="development"
API_KEY="<your-API-key>"
API_SECRET="<your-API-secret>"
ACCESS_TOKEN="<your-access-token>"
ACCESS_SECRET="<your-access-secret>"
BEARER_TOKEN="<your-bearer-token>"

APP_ID="<your-app-id>"
Your APP_ID is just the first section of the ACCESS_TOKEN. E.g. If your ACCESS_TOKEN is

1587638141888131111-ZbcwdlkfDZjfsdfasdfdff32HJBSdjd
then your APP_ID is the section before the dash

1587638141888131111
## Step 4: Create a Twitter client
Using the twitter-api-v2 package we installed in step 2, we will create a client. Create a new file called twitterClient.js and enter the following code.

twitterClient.js
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer };
We will use the twitterBearer to read tweets, and the twitterClient to write to the platform e.g. likes, posts etc.

## Step 5: Create an index.js file and call the Twitter API
Let's go ahead and create an index.js file. This is where we will run our app from. Add the following code

index.js
require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("Hello world!");
  } catch (e) {
    console.log(e)
  }
}

tweet();
The above code will import the twitterClient and tweet out "Hello world!". You can now go to Twitter and check whether the tweet was actually sent.
