import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface TokenInfo {
  username: string;
  id: string;
}

const createToken = (username: string, id: string) => {
  const tokenInfo: TokenInfo = {
    username,
    id,
  };

  if (!process.env.SECRET) {
    throw new Error("Token secret not provided");
  }

  const token = jwt.sign(tokenInfo, process.env.SECRET);
  return token;
};

export { createToken, TokenInfo };
