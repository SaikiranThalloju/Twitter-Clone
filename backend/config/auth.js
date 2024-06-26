
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
  path: "../config/.env",
});
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        messsage: "user not authenticated",
        success: false,
      });
    }

    const decode =  jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decode);
    req.user = decode.id;

    next();
  } catch (error) {
    console.log(error);
  }
};
