import jwt from "jsonwebtoken";
import config from "./config.js";

interface TokenInfo {
  username: string;
  id: string;
}

const createToken = (username: string, id: string) => {
  const tokenInfo: TokenInfo = {
    username,
    id,
  };

  const token = jwt.sign(tokenInfo, config.SECRET);
  return token;
};

export { createToken, TokenInfo };
