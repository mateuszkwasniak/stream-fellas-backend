# Stream Fellas (backend)

Backend layer of Stream Fellas - simple application for uploading, browsing and rating streamers.

## Endpoints

- POST /streamers: An endpoint to receive new streamer submissions from the frontend and store them in a database. A submission should be a JSON object with specific keys:

  - name - 4 to 24 characters, starting with a letter; letters, numbers,
    underscores, hyphens allowed
  - description - 20 - 300 characters
  - platform - currently one of: ["Twitch", "YouTube", "TikTok", "Kick", "Rumble"]

- GET /streamers: An endpoint to return all the stored streamer submissions in response to a request from the frontend.

- GET /streamer/\[streamerId]: An endpoint to return data about a specific streamer.

- PUT /streamers/\[streamerId]/vote: An endpoint to receive a vote for a specific streamer and update their current upvote/downvote count. This endpoint uses a streamerId from the URL as well as specific voting type string from the request body (JSON object with 'type' field):

  - "upvote" - increase streamer's upvotes count
  - "downvote" - increase streamer's downvotes count
  - "toggleNeg" - increase streamer's downvotes count, decrease upvotes count
  - "togglePos" - increase streamer's upvotes count, decrease downvotes count
  - "resetDownvote" - decrease streamer's downvotes count
  - "resetUpvote" - decrease streamer's upvote count

## Main technologies used

- JavaScript
- Node.js
- Express
- Mongoose
- MongoDB Atlas

## Installation

1. Clone repository:

   git clone https://github.com/mateuszkwasniak/stream-fellas-backend.git

2. Navigate to the project's folder:

   cd stream-fellas-backend

3. Install dependencies:

   npm install

## Configuration

Please note this project is the backend layer of the Stream Fellas application. In order to make it work fully you have to configure the frontend layer which can be found here: [Stream Fellas (frontend)](https://github.com/mateuszkwasniak/stream-fellas-frontend). There is one environment variable used in the backend part of the application - MONGODB_URL. After installation you have to create ".env" file in the project's root folder and provide your MongoDB Atlas cluster connection string. You also have to configure the app from the MongoDB Application Services in order to receive the live updates of streamers list in the frontend part of the application. This application will display any operation that is performed on the streamers collection. To do so, you have to configure rules about who has access to the data (everybody) and how the users will authenticate (anonymously). Follow instructions included in this guide in order to set up both frontend and backend variables correctly: [Real Time Data in a React JavaScript Front-End with Change Streams](https://www.mongodb.com/developer/products/mongodb/real-time-data-javascript/)

\* If you are from Dare Drop let me know and I will send you my MONGODB_URL connection string in order to run the project locally without extensive configuration 😉

## Running application locally

npm run dev

## Testing

\* Please note that created tests are performed using my own MongoDB Atlas cluster. If you are using your own you have to specify streamers Ids accordingly.

npm run test

## Demo

You can find the demo version of the application here: [Stream Fellas](https://stream-fellas.netlify.app/). Frontend layer is hosted on Netlify, backend on Render.
Please note that the free tier of Render services is used. As per their documentation: "Web Services on free instance type automatically spun down after 15 minutes of inactivity. When a new request for a free service comes in, Render spins it up again so it can process the request. This will cause a delay in the response of the first request after a period of inactivity while the instance spins up." Please be patient as it might take some time to load the streamers list initially!
