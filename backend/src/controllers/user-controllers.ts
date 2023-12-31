import User from "../models/Users.js";
import { NextFunction, Request, Response } from "express";

import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manage.js";
import { COOKIE_NAME } from "../utils/constants.js";

// get data of all the users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get all the users
    const users = await User.find();
    return res.status(201).json({ message: "Ok", users });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

// Controller for user signup
export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user SignUp
    // Destructuring the body data into the variables for easy use
    const { name, email, password } = req.body;

    // Check if user already exits
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send("User Already Registered");
    }

    // Encrypt the password before sending it to the database for the security reasons with the help of bcrypt
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user.save();

    // generate token and store cookie
    // clear cookie if already exits
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    // Generate token
    const token = createToken(user._id.toString(), user.email, "7d");

    // setting the date 7 days later
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // setting the cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      expires,
      signed: true,
    });

    return res.status(200).json({
      message: "Ok",
      email: user.email,
      name: user.name,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

// LogIn Controller
export const userLogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructuring the body data into the variables for easy use
    const { email, password } = req.body;

    // check if the user is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    // Check if password is correct. using compare fun from bcryct to check with encrypted password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect PassWord");
    }
    // clear the previous cookies in case of re login
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    // Generate token
    const token = createToken(user._id.toString(), user.email, "7d");
    // setting the cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      expires,
      signed: true,
    });

    return res
      .status(200)
      .json({
        message: "Ok",
        email: user.email,
        name: user.name,
        token: token,
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

// Check if the cookies exits if yes then login on refresh
export const userLogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if cookies exits
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not Registered of Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // clear the previous cookies in case of re login
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      domain: "localhost",
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "Ok", email: user.email, name: user.name });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if cookies exits
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not Registered of Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "Ok", email: user.email, name: user.name });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};
