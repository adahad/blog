import dotenv from "dotenv";

dotenv.config();

if (!process.env.SECRET) {
  throw new Error("No token secret provided");
}

// if (!process.env.AWS_ACCESS_KEY_ID) {
//   throw new Error("No AWS key ID provided");
// }

// if (!process.env.AWS_SECRET_ACCESS_KEY) {
//   throw new Error("NO AWS secret access key provided");
// }
if (!process.env.MONGODB_URI) {
  throw new Error("NO MONGODB_URI provided");
}

if (!process.env.PORT) {
  throw new Error("NO PORT provided");
}

const config = {
  SECRET: process.env.SECRET,
  // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};

export default config;
