//add your frontend origin to the allowedOrigins array:
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3500",
  "https://stream-fellas.netlify.app/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions, allowedOrigins };
