import { Request, Response } from 'express';
import { dwellingModel } from '../models/dwelling.model';
import { userModel } from "../models/user.model";

export function getDwelling(req: Request, res: Response) {

    dwellingModel.find({})
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch(() => {
            return res.sendStatus(500);
        })
}

export async function addDwelling(req: Request, res: Response) {
    const { user } = req.body
    if (!user) {
        return res.status(500).json({ message: "No user given." });
    }

    const crypto = require("crypto");
    const code = crypto.randomBytes(3 * 4).toString("hex");
    let findCode = null;

    while (findCode !== null) {
        findCode = await dwellingModel.findOne({ code: code })
    }

    const newDwelling = new dwellingModel({
        owner: user,
        code: code
    })
    await newDwelling.save();

    const userData = await userModel.findOne({ username: user });

    if (!userData) {
        return res.send(500).json({ message: "User not found" });
    }
    userData.currentDwelling = code;
    userData.availableDwellings.push(code);

    await userData.save();

    return res.send(200).json({ code })
}

export async function InviteUserToDwelling(req: Request, res: Response) {

    try {
        const { code, user } = req.body;

        if (!code || !user || code.length === 0 || user.length === 0) {
            return res.status(400).json({ message: 'missing or malformed parameters' });
        }

        const dwellingResult = await dwellingModel.findOne({ code });

        if (!dwellingResult) {
            return res.status(404).json({ message: 'Dwelling does not exist' });
        }

        const userResult = await userModel.findOne({ username: user });

        if (!userResult) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        dwellingResult.tenants.push(user);
        userResult.availableDwellings.push(code);

        await dwellingResult.save();
        await userResult.save();

        return res.status(200).json({ message: 'User invited successfully' });

    } catch (err) {
        return res.status(500).json({message: `An error has occurred: ${err}`});
    }
}