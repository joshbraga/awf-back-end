import { Request, Response, Router } from "express";
import { getAllPosts, addBill, addNotice } from "../controllers/posts.controllers";
import { getCurrentCode } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.get("/get-current-code", async (req, res) => {
  return getCurrentCode(req, res);
});