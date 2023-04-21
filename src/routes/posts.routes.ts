import { Request, Response, Router } from "express";
import { getAllPosts, addBill, addNotice } from "../controllers/posts.controllers";

export const postRoutes = Router();

postRoutes.get("/get", async (req, res) => {
  return getAllPosts(req, res);
});

postRoutes.post("/add-notice", async (req, res) => {
  return addNotice(req, res);
});

postRoutes.post("/add-bill", async (req, res) => {
  return addBill(req, res);
});

postRoutes.post("/delete", async (req, res) => {
  return getAllPosts(req, res);
});
