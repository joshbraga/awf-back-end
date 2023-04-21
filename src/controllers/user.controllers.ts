import {Request, Response} from 'express';
import { dwellingModel } from '../models/dwelling.model';
import { noticeModel } from '../models/notice.model';
import { billModel } from '../models/bill.model';
import { userModel } from '../models/user.model';

export async function getCurrentCode (req: Request, res: Response) {
    const user = req.query.user;
    if(!user){
        return res.sendStatus(500);
    }

    userModel.findOne({username: user})
        .then((x) => {
            return res.status(200).json(x?.currentDwelling)
        })
        .catch((err)=>{
            console.log(err);
            return res.sendStatus(500);
        })
}

export async function getAllCodes (req: Request, res: Response) {
    const user = req.query.user;
    if(!user){
        return res.sendStatus(500);
    }

    userModel.findOne({username: user})
        .then((x) => {
            return res.status(200).json(x?.availableDwellings)
        })
        .catch((err)=>{
            console.log(err);
            return res.sendStatus(500);
        })
}

export async function setCurrentCode (req: Request, res: Response) {
    const {user, code} = req.body;

    console.log(req.body);

    const getUser = await userModel.findOne({username: user});

    console.log(getUser);
    if(!getUser)
    {
        return res.sendStatus(500);
    }
    getUser.currentDwelling = code;
    await getUser.save();
    return res.sendStatus(200);
}

export async function getUser (req: Request, res: Response) {
    const user = req.query.user;

    try
    {
        const existingUser = await userModel.findOne({username: user});

        if(!existingUser)
        {
            return res.status(404).json({message:'User does not exist.'});            
        }
        else
        {
            res.status(200).json(existingUser);
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:'Failed to get user.'});
    }
}

export async function editUser (req: Request, res: Response) {
    const { firstName, lastName, newUser, user } = req.body;

    try
    {
        const existingUser = await userModel.findOne({username: user});

        if(!existingUser)
        {
            return res.status(404).json({message:'User does not exist.'});            
        }
        else
        {
            existingUser.firstname = firstName;
            existingUser.lastname = lastName;
            existingUser.username = newUser;
            await existingUser.save();
            return res.status(200).json({message: 'user edited successfully'});
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:'Failed to get user.'});
    }
}