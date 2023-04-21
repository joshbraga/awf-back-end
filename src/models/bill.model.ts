import mongoose from 'mongoose';
import { IBill } from './bill.interface';

export const billSchema = new mongoose.Schema({
    amount: String,
    username: String,
    item: String,
    note: String
}, { collection: 'dwellingData' });

export const billModel = mongoose.model<IBill & mongoose.Document>('BillSchema', billSchema);