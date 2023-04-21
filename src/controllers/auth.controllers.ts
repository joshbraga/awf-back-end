// REFERENCE      : Contents of this file was taken and modified from our capstone project. We have the same group for both projects

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

const JWT_ACCESS_TOKEN_SECRET = '1435ca643179a0f706f8e271c66aa2266be943ba965ce716c48da483526a112d93a93bd913c1fdddad0d2e47dfa7c70b82dd806b1c6bdad32df309c9af9dc56e';
const JWT_REFRESH_TOKEN_SECRET = '0154441011bfdc6a693ebc6ebd0943354dcc6a405d33e69492cf1ea2fb088e39fcde9f31192229307cfc0a6106edcb6fbdef910e4a8a04d3f5bcb33e5de42faf';

export async function HandleLogin(req: Request, res: Response) {

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username/password required" });
        }

        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "Username or password is incorrect" });
        }

        const pwCheck = await bcrypt.compare(password, user.password ?? "");

        if (pwCheck) {
            const accessToken = jwt.sign(
                { username: username },
                JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            const refreshToken = jwt.sign(
                { username },
                JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: "2d" }
            );

            user.refreshToken = refreshToken;
            await user.save();
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 48 * 60 * 60 * 1000 });
            return res.status(201).json({ accessToken })
        } else {
            return res.status(401).json({ message: 'Username/password is incorrect' });
        }

    } catch (err) {
        return res.status(500).json({ message: 'an error has occurred', err });
    }
}

export async function HandleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies || !cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt as string;

    const user = await userModel.findOne({ refreshToken });

    if (!user) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken,
        JWT_REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            const username = (decoded as any).username;

            if (err || user.username !== username) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign({ username }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            return res.status(200).json({ accessToken, username });
        });

}


export async function HandleLogout(req: Request, res: Response) {
    try {
        const cookies = req.cookies;
        if (!cookies || !cookies?.jwt) {
            return res.sendStatus(204);
        }

        const refreshToken = cookies.jwt as string;

        const user = await userModel.findOne({ refreshToken: refreshToken });

        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true })
            return res.sendStatus(204);
        }

        user.refreshToken = '';
        await user.save();

        res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(204);
    } catch (err) {
        return res.status(500).json({ message: `an error has occurred: ${err}` });
    }
}

export async function AddUser(req: Request, res: Response) {
    const { username, password, firstname, lastname } = req.body;

    try {

        if (await userModel.findOne({ username })) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashPass, firstname, lastname});
        await newUser.save();
        return res.status(201).json({ message: 'Added a new user.' });

    } catch (err) {
        return res.status(500).json({ message: 'Failed adding new user' });
    }
}