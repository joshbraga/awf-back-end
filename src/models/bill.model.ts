import mongoose from 'mongoose';
import { IBill } from './bill.interface';

const billSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, { collection: 'userData' });

export const billModel = mongoose.model<IBill & mongoose.Document>('BillSchema', billSchema);