import {Request, Response} from 'express';
import { dwellingModel } from '../models/dwelling.model';
import { noticeModel } from '../models/notice.model';
import { billModel } from '../models/bill.model';
import { userModel } from '../models/user.model';

export async function getCurrentCode (req: Request, res: Response) {
    const user = req.query.user;
    if(!user){
        res.sendStatus(500);
    }

    const userResults = await userModel.findOne({username: user});

    console.log(userResults);

    userModel.findOne({username: user})
        .then((x) => {
            return res.status(200).json(x?.currentDwelling)
        })
        .catch((err)=>{
            console.log(err);
            return res.sendStatus(500);
        })
}