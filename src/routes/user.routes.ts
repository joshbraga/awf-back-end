import { Request, Response, Router } from "express";
import { getAllPosts, addBill, addNotice } from "../controllers/posts.controllers";

export const userRoutes = Router();

// postRoutes.get("/get", async (req, res) => {
//   return getAllPosts(req, res);
// });