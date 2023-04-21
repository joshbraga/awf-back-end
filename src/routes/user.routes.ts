import { Request, Response, Router } from "express";
import { getAllPosts, addBill, addNotice } from "../controllers/posts.controllers";
import { editUser, getAllCodes, getCurrentCode, getUser, setCurrentCode } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.get("/get-current-code", async (req, res) => {
  return getCurrentCode(req, res);
});

userRoutes.get("/get-all-codes", async (req, res) => {
    return getAllCodes(req, res);
});

userRoutes.post("/set-room", async (req, res) => {
    return setCurrentCode(req, res);
});

userRoutes.get("/get-user", async (req, res) => {
  return getUser(req, res);
});

userRoutes.post("/edit-user", async (req, res) => {
    return editUser(req, res);
});