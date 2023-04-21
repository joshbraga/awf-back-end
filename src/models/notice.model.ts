import mongoose from 'mongoose';
import { INotice } from './notice.interface';


export const noticeSchema = new mongoose.Schema({
    username: String,
    title: String,
    content: String,
    date: Date
}, { collection: 'dwellingData' });

export const noticeModel = mongoose.model<INotice & mongoose.Document>('NoticeSchema', noticeSchema);