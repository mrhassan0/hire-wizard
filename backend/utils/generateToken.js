import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokenAndSetCookie = (username, res) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    // openssl rand -base64 32
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, //Prevent    cross-site scripting attacks
    sameSites: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
