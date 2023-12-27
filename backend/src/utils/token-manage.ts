import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { NextFunction, Request, Response } from "express";

// fun for generation of token
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`]; // cookie name is stored in constant
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token Verification Successful");
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
