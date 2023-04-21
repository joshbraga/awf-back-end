import {Request, Response} from 'express';
import { dwellingModel } from '../models/dwelling.model';
import { noticeModel } from '../models/notice.model';
import { billModel } from '../models/bill.model';

export async function getAllPosts (req: Request, res: Response) {
    //return res.json({message: 'NOT IMPLEMENTED: GetAllPosts'});
    //console.log(req.query.code, req.query.date)
    
    // await dwellingModel.find(findParams)
    //     .then((x) => {
    //         console.log(x);
    //         res.status(200);
    //     })

    const dateSearch = req.query.date as string;

    console.log(dateSearch);

    const dwelling = await dwellingModel.findOne({code: req.query.code});
    console.log(dwelling?.announcements);
    const announcements = dwelling?.announcements.filter(post => post.date == dateSearch);
    const roommates = dwelling?.roommates.filter(post => post.date == dateSearch);
    const bills = dwelling?.bills.filter(post => post.date == dateSearch);
    const landlord = dwelling?.landlord.filter(post => post.date == dateSearch);

    const posts = {
        announcements: announcements,
        roommates: roommates,
        bills: bills,
        landlord: landlord
    }

    console.log("POSTS: ", posts);

    res.status(200).json(posts);
}

export async function addNotice (req: Request, res: Response) {
    //return res.json({message: 'NOT IMPLEMENTED: AddPost'});

    const { code, title, content, user, date, type } = req.body
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth()+1;
    // const day = date.getDate();
    // const newNotice = new noticeModel({
    //     username: "admin",
    //     title: "Test post 1",
    //     content: "Yes",
    //     date: `${year}-${month}-${day}`
    // })

    // const newDwelling = new dwellingModel({
    //     code: "00000",
    //     owner: "admin",
    //     tenants: ["bob", "jeff", "bill"]
    // })

    //await newDwelling.save();

    const newNotice = new noticeModel({
        username: user,
        title: title,
        content: content,
        date: date
    })

    const dwelling = await dwellingModel.findOne({code: "00000"})
    if(!type){
        res.status(400).json({message: "No type specfied"});
    }
    if(type === "announcement"){
        dwelling?.announcements.push(newNotice);
    }
    else if(type === "roommate"){
        dwelling?.roommates.push(newNotice);
    }
    else if(type === "landlord"){
        dwelling?.landlord.push(newNotice);
    }

    await dwelling?.save();
    res.status(200).json({message:`Added a new ${type} post.`});
}

export async function addBill (req: Request, res: Response) {
    const { code, amount, item, note, date, user } = req.body

    const newBill = new billModel({
        amount: amount,
        username: user,
        item: item,
        note: note,
        date: date
    })

    try
    {
        const dwelling = await dwellingModel.findOne({code: code})
        dwelling?.bills.push(newBill);
        dwelling?.save();

        res.status(201).json({message:'Added new bill successfully!'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:'Failed to add new bill.'});
    }
}

export async function deletePost (req: Request, res: Response) {
    return res.json({message: 'NOT IMPLEMENTED: DeletePost'});
}