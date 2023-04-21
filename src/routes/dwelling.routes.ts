import { Request, Response, Router } from "express";
import { getDwelling, addDwelling } from "../controllers/dwelling.controllers";

export const dwellingRoutes = Router();

dwellingRoutes.get("/get", async (req, res) => {
  return getDwelling(req, res);
});

dwellingRoutes.post("/add", async (req, res) => {
  return addDwelling(req, res);
});