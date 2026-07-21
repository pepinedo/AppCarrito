import jwt from "jsonwebtoken";

const accessSecretKey = process.env.ACCESS_TOKEN_KEY;
const refreshSecretKey = process.env.REFRESH_TOKEN_KEY;

export const generateAccessToken = (payload, expiresIn = "1h") => {
  const accessToken = jwt.sign(payload, accessSecretKey, { expiresIn });
  return accessToken;   
};

export const generateRefreshToken = (payload, expiresIn = "7d") => {
  const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn });
  return refreshToken;
};  

export const generateBothTokens = (payload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
}