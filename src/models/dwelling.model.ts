import mongoose from "mongoose";
import { noticeSchema } from "./notice.model";
import { billSchema } from "./bill.model";
import { IDwelling } from "./dwelling.interface";



const dwellingSchema = new mongoose.Schema({
    code: String,
    announcements: [noticeSchema],
    roommates: [noticeSchema],
    bills: [billSchema],
    landlord: [noticeSchema],
    owner: String,
    tenants: [String]
}, { collection: 'dwellingData' });

export const dwellingModel = mongoose.model<IDwelling & mongoose.Document>('DwellingSchema', dwellingSchema);