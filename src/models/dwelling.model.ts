import mongoose from "mongoose";
import { noticeSchema } from "./notice.model";
import { billSchema } from "./bill.model";
import { IDwelling } from "./dwelling.interface";



const dwellingSchema = new mongoose.Schema({
    announcements: [noticeSchema],
    roommates: [noticeSchema],
    bills: [billSchema],
    landlord: [noticeSchema]
}, { collection: 'dwellingData' });

export const dwellingModel = mongoose.model<IDwelling & mongoose.Document>('DwellingSchema', dwellingSchema);