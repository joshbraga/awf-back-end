import {Router, Request, Response} from 'express';
import { userModel } from '../models/user.model';


export const authRoutes = Router();

authRoutes.post("/login", async(req: Request, res: Response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username/password required'});
    }

    

    return res.status(200).json({username: username, password: password});

});

authRoutes.post("/dev-user", async(req: Request, res: Response) => {    
    const {username, password, currentDwelling, availableDwellings } = req.body;

    console.log('fu');

    

    const newUser = new userModel({username, password, currentDwelling, availableDwellings});

    newUser.save()
    .then(() => res.status(200).json({message: 'Added a new user'}))
    .catch((err) => res.status(500).json({message: 'Internal server error', err}));   

});