import { Request, Response, Router } from "express";
import { getAllPosts } from "../controllers/posts.controllers";

export const postRoutes = Router();

postRoutes.get("/get-posts", async (req, res) => {
  return getAllPosts(req, res);
});
