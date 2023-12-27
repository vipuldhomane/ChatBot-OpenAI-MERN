import { Router } from "express";
import {
  userSignUp,
  getAllUsers,
  userLogIn,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manage.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogIn);
userRoutes.get("/auth-status", verifyToken, verifyUser); // to check if the cookies exists if yes then login
export default userRoutes;
