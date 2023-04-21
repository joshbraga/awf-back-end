import {Router, Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { userModel } from '../models/user.model';
import { AddUser, HandleLogin, HandleLogout, HandleRefreshToken } from '../controllers/auth.controllers';


export const authRoutes = Router();

authRoutes.post("/login", async(req: Request, res: Response) => {
    return await HandleLogin(req, res);
});

authRoutes.get("/refresh", async(req: Request, res: Response) => {
    return await HandleRefreshToken(req, res);    
});

authRoutes.get("/logout", async(req: Request, res: Response) => {
    return await HandleLogout(req, res);    
});

authRoutes.post("/new-user", async(req: Request, res: Response) => {    
      return await AddUser(req, res);
});