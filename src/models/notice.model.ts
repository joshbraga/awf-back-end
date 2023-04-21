import mongoose from 'mongoose';
import { INotice } from './notice.interface';

const noticeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { collection: 'userData' });

export const noticeModel = mongoose.model<INotice & mongoose.Document>('NoticeSchema', noticeSchema);